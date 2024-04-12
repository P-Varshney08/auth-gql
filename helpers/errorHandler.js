import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql';

export const ErrorTypes = {
    ALREADY_EXISTS: {
        errorCode: 'ALREADY_EXISTS',
        errorStatus: 400,
    },
    NOT_FOUND: {
        errorCode: 'NOT_FOUND',
        errorStatus: 404,
    },
    UNAUTHENTICATED: {
        errorCode: 'UNAUTHENTICATED',
        errorStatus: 401,
    },
    INTERNAL_SERVER_ERROR: {
        errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        errorStatus: 500,
    },
    BAD_REQUEST: {
        errorCode: ApolloServerErrorCode.BAD_REQUEST,
        errorStatus: 400,
    },

};

// throwCustomError function
export default (errorMessage, errorType) => {   // is function k parameters m ek message aaega or error ka type
    // throw new GraphQLError()        --> takes argument message and then optional arg code in extensions object
    throw new GraphQLError(errorMessage, {
        extensions: {
            code: errorType.errorCode,
            http: {
                status: errorType.errorStatus,
            },
        },
    });
};