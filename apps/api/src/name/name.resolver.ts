import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class NameResolver {
  @Query(() => String)
  getName(): string {
    return 'John Doe';
  }
}
