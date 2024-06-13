# Learn Mongodb aggregation pipelines

## Understand the Aggregation Pipeline
- Follow the link to read about the aggregation pipeline: `https://www.mongodb.com/docs/manual/core/aggregation-pipeline/`

## Creating a pipeline for user subscription.
- Inside the user.controllers.js file, add the below function for the pipeline:
```javascript
const getUserChannelProfile = asyncHandler(async (req, res) => {
    const {username} = req.params;
    if(!username.trim()) throw new ApiError(400, "Username missing");

    const channel = await User.aggregate([
        // Find the User by username
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        // Get the subscribers of the user's channel
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        // Get the channels which user has subscribed to
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        // Now counting the number of subscribers and channels user has subscribed and checked for subscriptions
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        // Returning the selected items
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                email: 1,
                coverImage: 1,
            }
        }
    ])

    if(!channel?.length) throw new ApiError(404, "Channel does not exists")

    return res
        .status(200)
        .json(new ApiResponse(200, channel[0], "User Channel Profile Fetched Successfully"));
});
```