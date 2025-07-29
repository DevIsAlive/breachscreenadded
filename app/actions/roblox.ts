"use server"

interface RobloxUserResponse {
  success: boolean
  headshotUrl?: string
  error?: string
  userId?: number
}

export async function getRobloxUserHeadshot(username: string): Promise<RobloxUserResponse> {
  try {
    // Step 1: Get user ID from username using POST request to avoid CORS
    const userSearchResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true,
      }),
    })

    if (!userSearchResponse.ok) {
      return { success: false, error: `Failed to search for user: ${userSearchResponse.status}` }
    }

    const userData = await userSearchResponse.json()

    if (!userData.data || userData.data.length === 0) {
      return { success: false, error: "User not found. Please check the username spelling." }
    }

    const userId = userData.data[0].id

    // Step 2: Get user avatar headshot
    const headshotResponse = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`,
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    )

    if (!headshotResponse.ok) {
      return { success: false, error: `Failed to get user avatar: ${headshotResponse.status}` }
    }

    const headshotData = await headshotResponse.json()

    if (!headshotData.data || headshotData.data.length === 0) {
      return { success: false, error: "No avatar data available for this user." }
    }

    const headshotUrl = headshotData.data[0].imageUrl

    if (!headshotUrl || headshotUrl.includes("placeholder")) {
      return { success: false, error: "User avatar not available." }
    }

    return {
      success: true,
      headshotUrl,
      userId,
    }
  } catch (error) {
    // If it's a network error, provide more specific feedback
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return { success: false, error: "Network error. Please check your connection and try again." }
    }

    return { success: false, error: `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}` }
  }
}

// Alternative function using a different API approach
export async function getRobloxUserHeadshotAlternative(username: string): Promise<RobloxUserResponse> {
  try {
    // Use the legacy API endpoint which sometimes has better CORS handling
    const userResponse = await fetch(
      `https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
    )

    if (!userResponse.ok) {
      throw new Error(`User lookup failed: ${userResponse.status}`)
    }

    const userData = await userResponse.json()

    if (!userData.Id) {
      return { success: false, error: "User not found" }
    }

    // Get avatar using the legacy thumbnail API
    const avatarResponse = await fetch(
      `https://www.roblox.com/headshot-thumbnail/image?userId=${userData.Id}&width=150&height=150&format=png`,
      {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
    )

    if (avatarResponse.ok) {
      // The response should be an image, so we use the URL directly
      return {
        success: true,
        headshotUrl: `https://www.roblox.com/headshot-thumbnail/image?userId=${userData.Id}&width=150&height=150&format=png`,
        userId: userData.Id,
      }
    }

    throw new Error("Avatar fetch failed")
  } catch (error) {
    return {
      success: false,
      error: `Failed to fetch user data: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
