import { Schema, model, models, InferSchemaType } from "mongoose";
import { hash, compare } from "bcrypt";
import dbConnect from "db";
const salt = 10;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rights: { type: [String], required: true, default: [] },
  },
  {
    statics: {
      authorize,
    },
  }
);

async function authorize(credentials) {
  await dbConnect();

  const { name, email, password } = credentials || {};
  let user;
  try {
    if (name && email && password) {
      user = await User.create({
        name,
        email,
        password,
      });
      //TODO: send verification mail before activating the account.,
    } else if (email && password) {
      user = await User.findOne({
        email: credentials.email,
      });
      if (!user || !(await compare(credentials.password, user.password))) {
        throw new Error();
      }
    }

    if (user) {
      return {
        user: {
          id: user._id.toString(),
          rights: user.rights,
          isAdmin: Boolean(user.rights.includes("admin")),
        },
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("auth/invalid-credentials");
  }
}

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, salt);
  next();
});

userSchema.pre("updateOne", async function (next) {
  //@ts-ignore
  const newPassword = this.getUpdate()?.password;

  if (newPassword) {
    this.update({ password: await hash(newPassword, salt) });
  }
  next();
});

delete models?.User;
const User = model("User", userSchema);

export default User;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type UserSchema = InferSchemaType<typeof userSchema> & { _id: string };
