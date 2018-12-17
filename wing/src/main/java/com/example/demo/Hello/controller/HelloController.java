package com.example.demo.Hello.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class HelloController {

    @RequestMapping("/hello")
    public String say(){
        return "hello";
    }

    @RequestMapping("/login")
    public String login(Map<String,Object> map){
        map.put("login","from TemplateController.helloHtml");
        return "login/index";
    }

    @RequestMapping("/login_01")
    public String login_01(Map<String,Object> map){
        map.put("login","from TemplateController.helloHtml");
        return "login/index_01";
    }
}
