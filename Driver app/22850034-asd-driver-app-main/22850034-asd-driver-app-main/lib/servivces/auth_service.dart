import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AuthService {
  final _baseUrl = dotenv.env['AUTH_HOST'];

  Future<Map<String, dynamic>> login(String username, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/login'),
      body: {'phoneNumber': username, 'password': password},
    );

    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the token
      final Map<String, dynamic> data = json.decode(response.body);
      return data;
    } else {
      // If the server did not return a 200 OK response,
      // throw an exception.
      throw Exception('Failed to login');
    }
  }

  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('token', token);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('token');
  }
}
