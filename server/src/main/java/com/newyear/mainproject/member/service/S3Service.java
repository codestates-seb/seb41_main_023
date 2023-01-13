package com.newyear.mainproject.member.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    //파일 저장
    public Map<String, String> uploadFile(String currentFilePath, MultipartFile multipartFile, boolean isBasicImage) throws IOException {

        String fileName = multipartFile.getOriginalFilename();

        //파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        String contentType = "";

        //content type 지정 (미지정시 자동 다운됨)
        if (ext.equals("jpeg") || ext.equals("jpg")) {
            contentType = "image/jpeg";
        } else if (ext.equals("png")) {
            contentType = "image/png";
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_VALUES);
        }

        Map <String, String> map = new HashMap<>();
        String file = "";

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);

            // key 값을 고유값으로 하기 위한 시간 설정
            SimpleDateFormat date = new SimpleDateFormat("yyyymmddHHmmss");
            file = fileName + "-" + date.format(new Date());

            // 이미 key 가 존재하면 기존 파일 삭제
            if (!"".equals(currentFilePath) && currentFilePath != null && !isBasicImage) {
                boolean isExistObject = amazonS3.doesObjectExist(bucket, currentFilePath);

                if (isExistObject) {
                    amazonS3.deleteObject(bucket, currentFilePath);
                }
            }

            map.put("key", file);
            amazonS3.putObject(new PutObjectRequest(bucket, file, multipartFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        String date = file.substring(file.length() - 14);
        String url = amazonS3.getUrl(bucket, fileName).toString() + "-" + date;
        map.put("url", url);

        return map;
    }
}
