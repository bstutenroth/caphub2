/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;


/** Provides access to the data stored in Datastore. */
public class Datastore {

  private DatastoreService datastore;

  public Datastore() {
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  /** Stores the Message in Datastore. */
  public void storeMessage(Message message) {
    Entity messageEntity = new Entity("Message", message.getId().toString());
    messageEntity.setProperty("user", message.getUser());
    messageEntity.setProperty("text", message.getText());
    messageEntity.setProperty("timestamp", message.getTimestamp());

    datastore.put(messageEntity);
  }

  /**
   * Gets messages posted by a specific user.
   *
   * @return a list of messages posted by the user, or empty list if user has never posted a
   *     message. List is sorted by time descending.
   */
  public List<Message> getMessages(String user) {
    Query query =
        new Query("Message")
            .setFilter(new Query.FilterPredicate("user", FilterOperator.EQUAL, user))
            .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return createMessages(results);
  }

  public List<Message> getAllMessages() {
    Query query = new Query("Message")
      .addSort("timestamp",SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return createMessages(results);
  }

  private List<Message> createMessages(PreparedQuery pq) {
    List<Message> messages = new ArrayList<>();

    for (Entity entity : pq.asIterable()) {
      try {
        String idString = entity.getKey().getName();
        UUID id = UUID.fromString(idString);
        String user = (String) entity.getProperty("user");
        String text = (String) entity.getProperty("text");
        long timestamp = (long) entity.getProperty("timestamp");

        Message message = new Message(id, user, text, timestamp);
        messages.add(message);
      } catch (Exception e) {
        System.err.println("Error reading message.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return messages;
  }

  public Set<String> getUsers(){
    Set<String> users = new HashSet<>();
    Query query = new Query("Message");
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity : results.asIterable()) {
      users.add((String) entity.getProperty("user"));
    }
    return users;
  }
  /** Stores the User in Datastore. */
  public void storeUser(User user) {
    Entity userEntity = new Entity("User", user.getEmail());
    userEntity.setProperty("email", user.getEmail());
    userEntity.setProperty("aboutMe", user.getAboutMe());
    datastore.put(userEntity);
  }

  /**
  * Returns the User owned by the email address, or
  * null if no matching User was found.
  */
  public User getUser(String email) {

    Query query = new Query("User")
    .setFilter(new Query.FilterPredicate("email", FilterOperator.EQUAL, email));
    PreparedQuery results = datastore.prepare(query);
    Entity userEntity = results.asSingleEntity();
    if (userEntity == null) {
      return null;
    }

    String aboutMe = (String) userEntity.getProperty("aboutMe");
    User user = new User(email, aboutMe);

    return user;
  }

  public void storeImageUrl (ImageUrl image) {
    Entity imageEntity = new Entity("ImageUrl", image.getId().toString());
    imageEntity.setProperty("id", image.getId().toString());
    imageEntity.setProperty("user", image.getUser());
    imageEntity.setProperty("message", image.getText());
    imageEntity.setProperty("image", image.getUrl());
    imageEntity.setProperty("location", image.getLocation());
    imageEntity.setProperty("timestamp", image.getTimestamp());

    datastore.put(imageEntity);
  }

  public List<ImageUrl> getImage(String id) {
    Query query =
        new Query("ImageUrl")
            .setFilter(new Query.FilterPredicate("id", FilterOperator.EQUAL, id))
            .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return createImageUrls(results);
  }

  public List<ImageUrl> getAllImages() {
    Query query = new Query("ImageUrl")
      .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return createImageUrls(results);
  }

  public List<ImageUrl> createImageUrls(PreparedQuery pq) {
    List<ImageUrl> images = new ArrayList<>();

    for (Entity entity: pq.asIterable()) {
      try {
        String idString = entity.getKey().getName();
        UUID id = UUID.fromString(idString);
        String userId = entity.getKey().getName();
        String user = (String) entity.getProperty("user");
        String imageUrl = (String) entity.getProperty("image");
        String message = (String) entity.getProperty("message");
        String location = (String) entity.getProperty("location");
        long timestamp = (long) entity.getProperty("timestamp");

        ImageUrl image = new ImageUrl(id, user, imageUrl, message, location, timestamp);
        images.add(image);
      } catch (Exception e) {
        System.err.println("Error reading message.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return images;
  }

  public void storeUserCaption (UserCaption caption) {
    Entity captionEntity = new Entity("UserCaption", caption.getCaptionId().toString());
    captionEntity.setProperty("imageId", caption.getImageId());
    captionEntity.setProperty("user", caption.getUser());
    captionEntity.setProperty("text", caption.getText());
    captionEntity.setProperty("timestamp", caption.getTimestamp());

    datastore.put(captionEntity);
  }

  public List<UserCaption> getAllCaptions() {
    Query query = new Query("UserCaption")
      .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    return createUserCaptions(results);
  }

  public List<UserCaption> createUserCaptions(PreparedQuery pq) {
    List<UserCaption> captions = new ArrayList<>();

    for (Entity entity : pq.asIterable()) {
      try {
        String idString = entity.getKey().getName();
        UUID userId = UUID.fromString(idString);
        String imageId = (String) entity.getProperty("imageId");
        String user = (String) entity.getProperty("user");
        String text = (String) entity.getProperty("text");
        long timestamp = (long) entity.getProperty("timestamp");

        UserCaption caption = new UserCaption(userId, imageId, user, text, timestamp);
        captions.add(caption);
      } catch (Exception e) {
        System.err.println("Error reading message.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }
    return captions;
  }

}
