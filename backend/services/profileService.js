
exports.getProfile = async (req, res) => {
  try {
    // Clerk automatically adds `req.auth` when `requireAuth` is used as middleware
    const user = req.auth;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back user details
    res.status(200).json({
      id: user.id,
      name: user.firstName + " " + user.lastName,
      email: user.emailAddresses[0]?.emailAddress || "",
      phone: user.phoneNumbers[0]?.phoneNumber || "",
      profilePic: user.profileImageUrl,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

exports.updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName", "email", "phone", "profileImageUrl"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    // Clerk automatically adds `req.auth` when `requireAuth` is used as middleware
    const user = req.auth;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prepare updates
    const updatePayload = {};
    if (req.body.firstName) updatePayload.firstName = req.body.firstName;
    if (req.body.lastName) updatePayload.lastName = req.body.lastName;
    if (req.body.email) updatePayload.emailAddress = req.body.email;
    if (req.body.phone) updatePayload.phoneNumber = req.body.phone;
    if (req.body.profileImageUrl) updatePayload.profileImageUrl = req.body.profileImageUrl;

    // Update user details in Clerk
    const updatedUser = await clerk.users.updateUser(user.id, updatePayload);

    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.firstName + " " + updatedUser.lastName,
      email: updatedUser.emailAddresses[0]?.emailAddress || "",
      phone: updatedUser.phoneNumbers[0]?.phoneNumber || "",
      profilePic: updatedUser.profileImageUrl,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};
