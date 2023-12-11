import mongoose, {Schema} from "mongoose";

const MatchSchema = new Schema<Match>({
    team1: String,
    team2: String,
    winner: {
        type: String,
        enum : ["team1","team2","none","unknown"]
    },
    status: String
})

const match = mongoose.model('Match', MatchSchema);

export default match;
