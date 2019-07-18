package com.google.codeu.data;

import java.util.UUID;

public class UserCaption {
  private UUID captionId;
  private String imageId;
  private String user;
  private String text;
  private long timestamp;

  /**
   * Constructs a new {@link UserCaptions} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */
  public UserCaption(String imageId, String user, String text) {
    this(UUID.randomUUID(), imageId, user, text, System.currentTimeMillis());
  }

  public UserCaption(UUID captionId, String imageId, String user, String text, long timestamp) {
    this.captionId = captionId;
    this.imageId = imageId;
    this.user = user;
    this.text = text;
    this.timestamp = timestamp;
  }

  public UUID getCaptionId() {
    return captionId;
  }

  public String getImageId() {
    return imageId;
  }

  public String getUser() {
    return user;
  }

  public String getText() {
    return text;
  }

  public long getTimestamp() {
    return timestamp;
  }
}
