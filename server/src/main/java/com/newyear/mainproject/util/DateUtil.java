package com.newyear.mainproject.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Locale;

public class DateUtil {
    public static final int SEC = 60;
    public static final int MIN = 60;
    public static final int HOUR = 24;
    public static final int DAY = 30;
    public static final int MONTH = 12;

    public static String convertLocalDatetimeToTime(LocalDateTime localDateTime) {
        LocalDateTime now = LocalDateTime.now();

        long diffTime = localDateTime.until(now, ChronoUnit.SECONDS);

        String msg = null;
        if (diffTime < SEC){
            return diffTime + "secs ago";
        }
        diffTime = diffTime / SEC;
        if (diffTime < MIN) {
            return diffTime + "min ago";
        }
        diffTime = diffTime / MIN;
        if (diffTime < HOUR) {
            return diffTime + "hours ago";
        }
        diffTime = diffTime / HOUR;
        if (diffTime < DAY) {
            return diffTime + "days ago";
        }
        diffTime = diffTime / DAY;
        if (diffTime < MONTH) {
            return diffTime + "months ago";
        }

        diffTime = diffTime / MONTH;
        return diffTime + "years ago";
    }

    public static String convertStringToDateFormatV1(String date) throws ParseException {
        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd", new Locale("en", "US"));
        SimpleDateFormat newDtFormat = new SimpleDateFormat("MMM dd, yyyy", new Locale("en", "US"));
        Date formatDate = dtFormat.parse(date);

        return newDtFormat.format(formatDate);
    }

    public static String convertStringToDateFormatV2(String date) throws ParseException {
        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd", new Locale("en", "US"));
        SimpleDateFormat newDtFormat1 = new SimpleDateFormat("EEEE, MMMM", new Locale("en", "US"));
        SimpleDateFormat newDtFormat2 = new SimpleDateFormat("d", new Locale("en", "US"));

        Date formatDate = dtFormat.parse(date);

        String weekMonth = newDtFormat1.format(formatDate);
        String day = newDtFormat2.format(formatDate);

        if(day.equals("1") || day.equals("21")) day += "st";
        else if(day.equals("2") || day.equals("22")) day +="nd";
        else if(day.equals("3") || day.equals("23")) day += "rd";
        else day += "th";

        return (weekMonth + " " + day);
    }
}

