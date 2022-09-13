package com.trippiece.backend.api.domain.dto.request;

import com.trippiece.backend.api.domain.dto.StickerDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaceRequestDto {
    private String name;
    private long regionId;
    private String locationAddress;
    private float lat;
    private float lng;
    private LocalDate startDate;
    private LocalDate endDate;
    private int type;
    private int amount;
    private List<StickerDto> stickerList;
}
