import { model, models, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface UserDocument {
  email: string;
  password: string;
  name: string;
  image: string;
  id: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      select: false,
    },
  },
  { timestamps: true }
);

// if there is no model user then create user model with this schema  else use model user
const User = models.Users || model<UserDocument>("Users", UserSchema);
export default User;
