import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Username is required'],
      text: true,
    },
    picture: {
      type: String,
      default:
        'https://c8.alamy.com/zooms/9/80d94c5b96c54446b2dc609a62b9f61b/2c5xkmf.jpg',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      trim: true,
    },
    birthYear: {
      type: Number,
      required: true,
      trim: true,
    },
    birthMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    birthDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      required: false,
    },
    friends: {
      type: Array,
      defautlt: [],
    },
    following: {
      type: Array,
      defautlt: [],
    },
    followers: {
      type: Array,
      defautlt: [],
    },
    requests: {
      type: Array,
      defautlt: [],
    },
    search: [
      {
        user: { type: ObjectId, ref: 'User' },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ['Single', 'Married', 'In a relationship', 'Divorced'],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true, // include virtual properties when converting to JSON
      transform(doc, returnedDocFromDB) {
        /**
         * Return id property with the value of _id
         */
        returnedDocFromDB.id = returnedDocFromDB._id.toString(); // add a new property `id` with the string value of `_id`

        /**
         * Prevent the id, password and __v properties from being returned
         */
        delete returnedDocFromDB._id; // delete the `_id` property
        delete returnedDocFromDB.password; // delete the `password` property
        delete returnedDocFromDB.__v; // delete the `__v` property
      },
    },
    toObject: {
      virtuals: true, // include virtual properties when converting to a plain JavaScript object
      transform(doc, returnedDocFromDB) {
        returnedDocFromDB.id = returnedDocFromDB._id.toString(); // add a new property `id` with the string value of `_id`
        delete returnedDocFromDB._id; // delete the `_id` property
      },
    },
  },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
