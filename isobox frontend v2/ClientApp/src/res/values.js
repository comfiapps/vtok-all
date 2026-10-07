import React from "react";

import strings from "./strings";
import Team from "../layouts/Team";
import {CheckRounded, MoreHoriz} from "@mui/icons-material";

import community from "../assets/community.png"
import creation from "../assets/creation.png"
import housing from "../assets/housing.png"
import trade from "../assets/trade.png"

import nft1 from "../assets/nft_transform.png"
import nft2 from "../assets/nft_creation.png"
import nft3 from "../assets/nft_other.png"

import jimmy from "../assets/team_member_01_jimmy.png";
import jay from "../assets/team_member_02_jay.png";
import eddy from "../assets/team_member_03_eddy.png";
import june from "../assets/team_member_04_june.png";
import charles from "../assets/team_member_05_charles.png";
import eggy from "../assets/team_member_06_eggy.png";
import harry from "../assets/team_member_07_harry.png";
import eric from "../assets/team_member_08_eric.png";
import jinger from "../assets/team_member_09_jinger.png";
import justin from "../assets/team_member_10_justin.png";
import mini from "../assets/team_member_11_mini.png";
import mia from "../assets/team_member_12_mia.png";
import rose from "../assets/team_member_13_rose.png";
import wilson from "../assets/team_member_14_wilson.png";
import advisor1 from "../assets/advisor1.png";
import advisor2 from "../assets/advisor2.png";
import advisor3 from "../assets/advisor3.png";
import advisor4 from "../assets/advisor4.png";
import ServiceTabs from "../layouts/Contents/ServiceTabs";
import NFTInIsobox from "../layouts/Contents/NFTInIsobox";
import Pet from "../layouts/Contents/Avatar";
import Story from "../layouts/Contents/Story";
import RoadmapSection from "../layouts/Contents/Roadmap";
import Overview from "../layouts/Contents/Overview";
import pet1 from "../assets/web.image_anim_pet1.webp"
import pet2 from "../assets/web.image_anim_pet2.webp"
import pet3 from "../assets/web.image_anim_pet3.webp"
import petback1 from "../assets/web.image_pet11_back.png"
import petback2 from "../assets/web.image_pet22_back.png"
import petback3 from "../assets/web.image_pet3_back.png"

export const values = {

    breakpoint: "lg",
    mobileBreakpoint: 600,
    content_max: 1200,

    sections: [
        {
            short: strings.home,
            noTopPadding: true,
        },
        {
            short: strings.logo_name,
            title: strings.logo_name,
            layout: <Overview />,
            shortNoUppercase: true,
            emphasize_title: true,
            noContainer: true,
        },
        {
            layout: <ServiceTabs />,
        },
        {
            subtitle: strings.nft_in_isobox,
            description: strings.nft_in_isobox_description,
            layout: <NFTInIsobox />,
            big_pb: true,
        },
        {
            short: strings.nft,
            title: strings.nft,
            subtitle: strings.nft_description,
            layout: <Pet />,
            noContainer: true,
            bgColor: "#f8f9fa",
            big_description: true,
            big_pt: true,
        },
        {
            subtitle: strings.story,
            layout: <Story />,
            bgColor: "#f8f9fa",
            cap_subtitle: true,
            big_pb: true,
            noContainer: true,
        },
        {
            short: strings.team,
            title: strings.team,
            description: strings.team_description,
            layout: <Team />,
            cap_title: true,
            big_pt: true,
            big_pb: true,
            noContainer: true,
            scrollTop: 120,
        },
        // {
        //     title: strings.partner,
        //     layout: <PartnerSection />,
        //     bgColor: "#f8f9fa",
        // },
        {
            short: strings.roadmap,
            title: strings.roadmap,
            layout: <RoadmapSection />,
            bgColor: "#f8f9fa",
            cap_title: true,
            // isDark: true,
            big_pt: true,
            big_pb: true,
        },
    ],

    myStatus: [strings.whitelist, strings.default_user, strings.before_wallet_connection],

    serviceContents: [
        {
            title: strings.community,
            description: strings.community_description,
            image: community
        },
        {
            title: strings.creation,
            description: strings.creation_description,
            image: creation
        },
        {
            title: strings.housing,
            description: strings.housing_description,
            image: housing
        },
        {
            title: strings.trade,
            description: strings.trade_description,
            image: trade
        },
    ],

    petContents: [
        {
            source: pet1,
            source_backwards: petback1,
            forwardWidth: "100%",
            forwardLeft: 20,
            forwardBottom: -16,
            backwardWidth: "100%",
            backwardBottom: 10,
            style: {
                "opacity": "0.4",
                "backgroundImage": "linear-gradient(230deg, #fbbb78, #ff9530 100%)"
            }
        },
        {
            source: pet2,
            source_backwards: petback2,
            forwardWidth: "100%",
            forwardLeft: 20,
            forwardBottom: -14,
            backwardWidth: "100%",
            backwardBottom: 10,
            style: {
                "opacity": "0.5",
                "boxShadow": "0 8px 20px 10px rgba(141, 147, 215, 0.2)",
                "backgroundImage": "linear-gradient(230deg, #8d93d7, #2c37ab 100%)"
            }
        },
        {
            source: pet3,
            source_backwards: petback3,
            forwardWidth: "100%",
            forwardLeft: 20,
            forwardBottom: -14,
            backwardWidth: "92%",
            backwardBottom: 10,
            style: {
                "opacity": "0.4",
                "backgroundImage": "linear-gradient(230deg, #c7e3de, #5b9186 100%)"
            }
        },
    ],

    nftContents: [
        {
            title: strings.avatar,
            image: nft1
        },
        {
            title: strings.creation_item,
            image: nft2
        },
        {
            title: strings.external_service,
            image: nft3
        },
    ],

    keyMemberContents: [
        {
            name: strings.jimmy_name,
            sub: strings.jimmy_position,
            detail: strings.jimmy_detail,
            image: jimmy,
        },
        {
            name: strings.jay_name,
            sub: strings.jay_position,
            detail: strings.jay_detail,
            image: jay,
        },
        {
            name: strings.eddy_name,
            sub: strings.eddy_position,
            detail: strings.eddy_detail,
            image: eddy,
            small_letters: true,
        },
        {
            name: strings.june_name,
            sub: strings.june_position,
            detail: strings.june_detail,
            image: june,
        },
    ],

    teamContents: [
        {
            name: strings.charles_name,
            sub: strings.charles_position,
            detail: strings.charles_word,
            image: charles,
        },
        {
            name: strings.eggy_name,
            sub: strings.eggy_position,
            detail: strings.eggy_word,
            image: eggy,
        },
        {
            name: strings.harry_name,
            sub: strings.harry_position,
            detail: strings.harry_word,
            image: harry,
        },
        {
            name: strings.eric_name,
            sub: strings.eric_position,
            detail: strings.eric_word,
            image: eric,
        },
        {
            name: strings.jinger_name,
            sub: strings.jinger_position,
            detail: strings.jinger_word,
            image: jinger,
        },
        {
            name: strings.justin_name,
            sub: strings.justin_position,
            detail: strings.justin_word,
            image: justin,
        },
        {
            name: strings.mini_name,
            sub: strings.mini_position,
            detail: strings.mini_word,
            image: mini,
        },
        {
            name: strings.mia_name,
            sub: strings.mia_position,
            detail: strings.mia_word,
            image: mia,
        },
        {
            name: strings.rose_name,
            sub: strings.rose_position,
            detail: strings.rose_word,
            image: rose,
        },
        {
            name: strings.wilson_name,
            sub: strings.wilson_position,
            detail: strings.wilson_word,
            image: wilson,
        },
    ],

    advisorContents: [
        {
            name: strings.advisor1_name,
            sub: strings.advisor1_position,
            cap: strings.advisor1_location,
            detail: strings.advisor1_detail,
            image: advisor1,
            longWidth: "115%",
        },
        {
            name: strings.advisor2_name,
            sub: strings.advisor2_position,
            cap: strings.advisor2_location,
            detail: strings.advisor2_detail,
            image: advisor2,
        },
        {
            name: strings.advisor3_name,
            sub: strings.advisor3_position,
            cap: strings.advisor3_location,
            detail: strings.advisor3_detail,
            image: advisor3,
            small_letters: true,
        },
        {
            name: strings.advisor4_name,
            sub: strings.advisor4_position,
            cap: strings.advisor4_location,
            detail: strings.advisor4_detail,
            image: advisor4,
            longWidth: "110%",
        },
    ],

    roadmapContents: [
        {
            title: strings.roadmap_title_1,
            date: strings.roadmap_date_1,
            description: strings.roadmap_description_1,
            icon: <CheckRounded fontSize={"small"} />,
            isColored: true,
        },
        {
            title: strings.roadmap_title_2,
            date: strings.roadmap_date_2,
            description: strings.roadmap_description_2,
            icon: <MoreHoriz fontSize={"small"} />
        },
        {
            title: strings.roadmap_title_3,
            date: strings.roadmap_date_3,
            description: strings.roadmap_description_3,
            icon: <MoreHoriz fontSize={"small"} />
        },
        {
            title: strings.roadmap_title_4,
            date: strings.roadmap_date_4,
            description: strings.roadmap_description_4,
            icon: <MoreHoriz fontSize={"small"} />
        },
    ],

}