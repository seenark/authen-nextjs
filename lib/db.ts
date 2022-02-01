import {MongoClient} from 'mongodb'

const user = "HadesGod4"
const pass = "HadesGod4"
const dbname = "nextjs_learn"

export function connectToDatabase() {
    return MongoClient.connect(`mongodb+srv://${user}:${pass}@hdgcluster.xmgsx.mongodb.net/${dbname}?retryWrites=true&w=majority`)
}