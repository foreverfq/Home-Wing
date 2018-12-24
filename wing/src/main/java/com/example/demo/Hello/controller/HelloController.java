package com.example.demo.Hello.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Controller
@RequestMapping("")
public class HelloController {


    @RequestMapping("/login")
    public String login(Map<String,Object> map){
        map.put("login","from TemplateController.helloHtml");
        return "login/index";
    }


    @RequestMapping("/superstar")
    public String sky(Map<String,Object> map){
        map.put("login","from TemplateController.helloHtml");
        return "star/super";
    }
}
