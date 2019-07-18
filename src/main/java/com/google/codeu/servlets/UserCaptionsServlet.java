import com.google.codeu.data.Datastore;
import com.google.codeu.data.UserCaption;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@WebServlet("/userCaptions")
public class UserCaptionsServlet extends HttpServlet {

  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    
    List<UserCaption> captions = datastore.getAllCaptions();
    Gson gson = new Gson();
    String json = gson.toJson(captions);

    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the id of the image the caption is for
    String imageId = request.getParameter("imageId");

    // Get the message entered by the user.
    String message = Jsoup.clean(request.getParameter("caption"), Whitelist.none());

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/index.html");
      return;
    }
    String user = userService.getCurrentUser().getEmail();
    UserCaption caption = new UserCaption(imageId, user, message);
    datastore.storeUserCaption(caption);

    response.sendRedirect("/feed.html");
  }

}
