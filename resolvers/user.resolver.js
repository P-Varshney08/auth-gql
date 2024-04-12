import { GraphQLError } from "graphql"
import bcryptjs from 'bcryptjs';
import User from "../models/User.js";
import userHelper from '../helpers/user.helper.js'
import throwCustomError, {ErrorTypes} from '../helpers/errorHandler.js'
import jwt from 'jsonwebtoken';

const userResolver = {
    Query: {
        getUsers: async() => {
            try {
                const users = await User.find().sort({createdAt: 0});
                return users;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getUser: async(_, args)=> {
            const {id} = args;
            try {
                const user = await User.findById(id);
                if(!user){
                    throw new GraphQLError("No user found with given id");
                }
                return user;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },

    Mutation: {
        signup: async(_, {input}) => {
            const {email, password, username} = input;
            try { 
                // check for existing user
                // const isUserExists = await User.findOne({email: email});
                const isUserExists = await userHelper.isEmailExists(email);
                if(isUserExists){
                    // throw new Error('Email already in use');
                    throwCustomError('Email already exists in database', ErrorTypes.ALREADY_EXISTS);
                }
                const hashedPassword = bcryptjs.hashSync(password, 10);
                const newUser = new User({
                    email,
                    password: hashedPassword,
                    username,
                    recipe: [],
                });
                await newUser.save();
                const token = jwt.sign({userId: newUser._id, email: newUser.email}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
                return {
                    __typename: 'UserWithToken',
                    ...newUser.toObject(),
                    userJwtToken: {
                        token: token,
                    },
                };
            } catch (error) {
                throwCustomError('Internal Server Error', ErrorTypes.INTERNAL_SERVER_ERROR);
            }
        },
        signin: async(_, {input}) => {
            const {email, password} = input;
            try {
                const user = await User.findOne({email});
                if(!user){
                    throwCustomError('Email not registered', ErrorTypes.NOT_FOUND)
                }
                const passwordMatched = bcryptjs.compareSync(password, user.password);
                if(!passwordMatched){
                    throwCustomError('Invalid credentials', ErrorTypes.UNAUTHENTICATED);
                }
                const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
                return {
                    __typename: 'UserWithToken',
                    userId: user._id,
                    email: user.email,
                    userJwtToken: {
                      token,
                    },
                  };
            } catch (error) {
                throwCustomError('Internal Server Error', ErrorTypes.INTERNAL_SERVER_ERROR);
            }

        },
    }
}

export default userResolver;