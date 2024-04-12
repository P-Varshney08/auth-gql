import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone'
import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
import allTypeDefs from './typeDefs/index.typeDef.js'
import allResolvers from './resolvers/index.resolver.js'

const server = new ApolloServer({
    typeDefs: allTypeDefs,
    resolvers: allResolvers,
})

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 6010;

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('DB connected');
    return startStandaloneServer(server, {
        listen: {port: PORT},
    });
})
.then((server)=>{
    console.log(`Server ready at ${server.url}`);
})
.catch(error=>{
    console.log(`Error starting the server: ${error}`);
})