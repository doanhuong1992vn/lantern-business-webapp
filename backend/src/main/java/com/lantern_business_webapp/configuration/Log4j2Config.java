//package com.lantern_business_webapp.configuration;
//
//import jakarta.annotation.PostConstruct;
//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.core.LoggerContext;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class Log4j2Config {
//    @Value("${log.folder-name}")
//    private String logFolderName;
//
//
//    @Value("${log.filename}")
//    private String logFileName;
//
//    public Log4j2Config() {
//        System.setProperty("logFolderName", logFolderName);
//        System.setProperty("logFileName", logFileName);
//    }
//
//    @PostConstruct
//    public void init() {
//        LoggerContext context = (LoggerContext) LogManager.getContext(false);
//        context.getConfiguration().getProperties().put("logFolderName", logFolderName);
//        context.getConfiguration().getProperties().put("logFileName", logFileName);
//        context.updateLoggers();
//    }
//}
