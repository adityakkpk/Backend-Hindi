# Writing update controllers for user

## Creating a new Subscription Model
- Create a new file `subscription.mode.js` inside the `models` directory and write the code for the subscription model: 
```javascript
import mongoose, {Schema } from 'mongoose';

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: 'User',
    }, 
    channel: {
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
        ref: 'User',
    }
}, {timeseries: true});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
```