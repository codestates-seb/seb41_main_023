package com.newyear.mainproject.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

public class DateCalculation {

    public static List<String> dateCal(String start, String end) {
        List<String> resultDate = new ArrayList<>(); //사이 날짜 저장할 리스트;

        try {
            int[] startSplit = Arrays.stream(start.split("-")).mapToInt(Integer::parseInt).toArray();
            int[] endSplit = Arrays.stream(end.split("-")).mapToInt(Integer::parseInt).toArray();

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

            Calendar calendar = Calendar.getInstance();

            calendar.set(endSplit[0], endSplit[1] - 1, endSplit[2]);
            String endDate = dateFormat.format(calendar.getTime());


            calendar.set(startSplit[0], startSplit[1] - 1, startSplit[2]);
            String startDate = dateFormat.format(calendar.getTime());

            resultDate.add(dateFormat.format(calendar.getTime())); // 처음 시작 값 세팅
            while (!startDate.equals(endDate)) { // 시작 일자와 끝 일자가 같아지면 멈춘다
                calendar.add(Calendar.DATE, 1); // 1일 증가
                startDate = dateFormat.format(calendar.getTime()); // 비교를 위한 값

                resultDate.add(dateFormat.format(calendar.getTime())); // 1일 증가 값 add
            }

        }catch (Exception e) {
            System.out.println("Error : " + e.getMessage());
        }
        return resultDate;
    }

}
