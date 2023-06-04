package com.lantern_business_webpp.exception;

import lombok.Getter;

import java.util.Date;


public record ErrorDetails(Date timestamp, String message, String details) {
}
