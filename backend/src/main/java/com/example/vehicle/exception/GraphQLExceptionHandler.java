package com.example.vehicle.exception;

import graphql.GraphQLError;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Component;
import graphql.GraphqlErrorBuilder;

@Component
public class GraphQLExceptionHandler extends DataFetcherExceptionResolverAdapter {

	@Override
	protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
		if (ex instanceof NotFoundException) {
			return GraphqlErrorBuilder.newError(env).message(ex.getMessage()).errorType(ErrorType.NOT_FOUND).build();
		}
		if (ex instanceof DuplicateResourceException) {
			return GraphqlErrorBuilder.newError(env).message(ex.getMessage()).errorType(ErrorType.BAD_REQUEST).build();
		}
		// Let other exceptions be handled by default (will appear as internal errors)
		return null;
	}
}