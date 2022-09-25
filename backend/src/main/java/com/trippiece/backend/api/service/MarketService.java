package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.response.MarketStickerResponseDto;
import com.trippiece.backend.api.domain.dto.response.StickerMarketResponseDto;
import com.trippiece.backend.api.domain.entity.Market;
import com.trippiece.backend.api.domain.entity.Sticker;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.MarketRepository;
import com.trippiece.backend.api.domain.repository.StickerRepository;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final MarketRepository marketRepository;
    private final StickerRepository stickerRepository;


    public Page<MarketStickerResponseDto> findMarketSticker(final long regionId, final int sort, String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        List<Market> marketList = new ArrayList<>();
        List<MarketStickerResponseDto> responseList = new ArrayList<>();


        if (regionId == 0 && sort == 0) {
            marketList = marketRepository.findAll();
            for (Market market : marketList) {
                responseList.add(new MarketStickerResponseDto(market));
            }
        } else if (regionId != 0) {
            if (sort == 1) {
                marketList = marketRepository.findAll(Sort.by(Sort.Direction.ASC, "price"));
            } else if (sort == 2) {
                marketList = marketRepository.findAll(Sort.by(Sort.Direction.DESC, "price"));
            }
            for (Market market : marketList) {
                long maRegionId = market.getSticker().getPlace().getRegion().getId();
                if (maRegionId == regionId) {
                    responseList.add(new MarketStickerResponseDto(market));
                }
            }

        }
        if(keyword!=null){

            for(MarketStickerResponseDto s :responseList){
                //contains 때문에 equalsIgnoreCase 못했삼. 나중에 주석 지울 거임
                if(!s.getTokenName().toLowerCase().contains(keyword.toLowerCase())){
                    responseList.remove(s);
                }
            }
        }


        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<MarketStickerResponseDto> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }

    public StickerMarketResponseDto findMarketStickerDetail(long marketId){
Market market = marketRepository.findById(marketId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
   return new StickerMarketResponseDto(market);
    }

    public void addMarketSticker(User user, long tokenId, float price) {
        Sticker sticker = stickerRepository.findByTokenId(tokenId);
        Market marketBuilder = Market.builder()
                .price(price)
                .sticker(sticker)
                .user(user)
                .build();
        Market market = marketRepository.save(marketBuilder);

    }

    public int deleteMarketSticker(final User user, final long marketId) {
        int resultCode = 200;
        Market market = marketRepository.findById(marketId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!market.getUser().equals(user)) resultCode = 406;
        else {
            marketRepository.delete(market);

        }
        return resultCode;
    }
}