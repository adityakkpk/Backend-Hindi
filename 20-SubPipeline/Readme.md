# How to write sub pipelines and routes

## Creating a pipeline for watch-history.
- In this pipelining process firstly, we will `select user`.
- Then we will fetch `watchHistory` 
- Then we will find the `owner` of the watchHistory.
- Then we converted the returned array into a single element.
- Inside the `user.controller.js` file: 
```javascript
const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.user?._id)
            }
        }, 
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                // Sub-pipeline
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                // $arrayElemAt: ["$owner", 0]
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, user[0].watchHistory, "Watch History fetched successfully"));
});
```

## Add some new routes for user controller
- ```javascript
    router.route("/change-password").post(verifyJWT, changeCurrentPassword);
    router.route("/current-user").get(verifyJWT, getCurrentUser);
    router.route("/update-account").patch(verifyJWT, updateAccountDetails);

    router
        .route("/avatar")
        .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
    router
        .route("/cover-image")
        .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

    router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
    router.route("/history").get(verifyJWT, getWatchHistory);
  ```