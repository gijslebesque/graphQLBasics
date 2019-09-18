//model the db
//how data looks like

const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
  {
    id: '1',
    name: 'Leeroy Jenkins',
    age: 27
  },
  {
    id: '2',
    name: 'Henry',
    age: 27
  }
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id }); //graphql takes care of type coercion
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
