package com.google.codeu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;

import java.io.IOException;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Returns City data as a JSON array
 * example: [{"lat": 34.567, "lng": -123.45}]
 */
@WebServlet("/map-data")
public class MapCitiesDataServlet extends HttpServlet {

  private JsonArray popCityArray;

  /**
   * Reads each line of data at "/WEB-INF/popularCities.csv" and converts it to
   * JSON, which is then added to an ArrayList
   * used to get the latitude and longitude data for the markers on the map.
   * Can see the JSON data at "/map-data" 
   */
  @Override
  public void init() {
    popCityArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/popularCities.csv"));
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");

      double lat = Double.parseDouble(cells[0]);
      double lng = Double.parseDouble(cells[1]);

      popCityArray.add(gson.toJsonTree(new MapCity(lat, lng)));
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().println(popCityArray.toString());
  }

  private static class MapCity {
    double lat;
    double lng;

    private MapCity(double lat, double lng) {
      this.lat = lat;
      this.lng = lng;
    }
  }
}
