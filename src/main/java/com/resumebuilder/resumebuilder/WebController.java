package com.resumebuilder.resumebuilder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/{path:[^\\.]*}") // Catch all routes except static files
    public String forward() {
        return "forward:/index.html";
    }
}
