import { readFileSync } from 'fs'
import gql from "graphql-tag"


export const typeDefs = gql(
    readFileSync("models/graphql/schema.graphql", {
        encoding: "utf-8"
    })
)