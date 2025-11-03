import { Socket, Server as SocketIOServer } from "socket.io";
import User from "../models/User.ts";
import { generateToken } from "../utils/token.ts";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  // Test event (optional)
  socket.on("testSocket", () => {
    socket.emit("testSocket", { msg: "its real time !!!" });
  });

  // Update Profile
  socket.on(
    "updateProfile",
    async (data: { name?: string; avatar?: string }) => {
      const userId = socket.data.userId;

      if (!userId) {
        return socket.emit("updateProfile", {
          success: false,
          msg: "Unauthorized",
        });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            name: data.name,
            avatar: data.avatar,
          },
          { new: true }
        );

        if (!updatedUser) {
          return socket.emit("updateProfile", {
            success: false,
            msg: "User not found",
          });
        }

        const token = generateToken(updatedUser);

        socket.emit("updateProfile", {
          success: true,
          msg: "Profile Updated Successfully",
          token,
          user: updatedUser,
        });
      } catch (error) {
        console.log("Error Updating Profile:", error);
        socket.emit("updateProfile", {
          success: false,
          msg: "Error Updating Profile",
        });
      }
    }
  );
}
