package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import java.io.IOException;
import java.util.List;


/**
 * Handles fetching images to display
 */

 @WebServlet("/images")
 public class ImagesServlet extends HttpServlet {

   private Datastore datastore;

   @Override
   public void init() {
     datastore = new Datastore();
   }

   @Override
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
      response.getOutputStream().println("this will be my images page");


      /*response.setContentType("application/json");

      List<Message> messages = datastore.getAllMessages();
      Gson gson = new Gson();
      String json = gson.toJson(messages);

      response.getOutputStream().println(json);*/
      
   }

}
