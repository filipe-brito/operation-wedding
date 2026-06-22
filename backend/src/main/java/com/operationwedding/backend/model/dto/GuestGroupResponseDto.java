package com.operationwedding.backend.model.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GuestGroupResponseDto {
    @JsonProperty("id")
    private Long guestId;
    @JsonProperty("full_name")
    private String guestName;
    private List<Companion> companions = new ArrayList<>();

    public Long getGuestId() {
        return guestId;
    }
    public void setGuestId(Long guestId) {
        this.guestId = guestId;
    }
    public String getGuestName() {
        return guestName;
    }
    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }
    public List<Companion> getCompanions() {
        return companions;
    }

    public void setCompanions(List<Companion> companions) {
        this.companions = companions;
    }

    public static class Companion {
        @JsonProperty("id")
        private Long companionId;
        @JsonProperty("full_name")
        private String companionName;
        public Long getCompanionId() {
            return companionId;
        }
        public void setCompanionId(Long companionId) {
            this.companionId = companionId;
        }
        public String getCompanionName() {
            return companionName;
        }
        public void setCompanionName(String companionName) {
            this.companionName = companionName;
        }
    }
}
