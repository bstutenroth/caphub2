package com.google.codeu.data;

import java.util.UUID;

/** A single message posted by a user. */
public class ImageUrl {

  private UUID id;
  private String user;
  private String url;
  private String text;
  private String location;
  private long timestamp;

  /**
   * Constructs a new {@link ImageUrl} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */
  public ImageUrl(String user, String url, String text, String location) {
    this(UUID.randomUUID(), user, url, text, location, System.currentTimeMillis());
  }

  public ImageUrl(UUID id, String user, String url, String text, String location, long timestamp) {
    this.id = id;
    this.user = user;
    this.url = url;
    this.text = text;
    this.location = location;
    this.timestamp = timestamp;
  }

  public UUID getId() {
    return id;
  }

  public String getUser() {
    return user;
  }

  public String getUrl() {
    return url;
  }

  public String getText() {
    return text;
  }

  public String getLocation() {
    return location;
  }

  public long getTimestamp() {
    return timestamp;
  }

}
