import React from "react";

import strings from "./strings";
import ServiceSection from "../layouts/Service";
import NFTSection from "../layouts/NFT";
import TeamSection from "../layouts/Team";
import PartnerSection from "../layouts/Partner";
import RoadmapSection from "../layouts/Roadmap";
import {CheckRounded, MoreHoriz} from "@mui/icons-material";

import function1 from "../assets/web.image.function01.png"
import function2 from "../assets/web.image.function02.png"
import function3 from "../assets/web.image.function01.png"
import function4 from "../assets/web.image.function04.png"

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

export const values = {

    breakpoint: "lg",

    sections: [
        {
            short: strings.home,
        },
        {
            short: strings.logo_name,
            layout: <ServiceSection />,
            noContainer: true,
        },
        {
            title: strings.nft_title,
            description: strings.nft_description,
            layout: <NFTSection />,
            bgColor: "#f8f9fa",
        },
        {
            short: strings.aboutus,
            title: strings.team,
            description: strings.team_description,
            layout: <TeamSection />
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
            bgColor: "#1a1a1a",
            isDark: true,
        },
    ],

    serviceContents: [
        {
            title: strings.trade,
            description: strings.trade_description,
            image: function4
        },
        {
            title: strings.creation,
            description: strings.creation_description,
            image: function2
        },
        {
            title: strings.housing,
            description: strings.housing_description,
            image: function3
        },
        {
            title: strings.community,
            description: strings.community_description,
            image: function1
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

    teamContents: [
        {
            name: "jimmy",
            sub: "Founder & CEO",
            detail: strings.jimmy_word,
            image: jimmy,
        },
        {
            name: "jay",
            sub: "Project Director",
            detail: strings.jay_word,
            image: jay,
        },
        {
            name: "eddy ",
            sub: "Art Director",
            detail: strings.eddy_word,
            image: eddy,
            small_letters: true,
        },
        {
            name: "june",
            sub: "Technical Director",
            detail: strings.june_word,
            image: june,
        },
        {
            name: "charles",
            sub: "Product Manager",
            detail: strings.charles_word,
            image: charles,
        },
        {
            name: "eggy",
            sub: "Product Manager",
            detail: strings.eggy_word,
            image: eggy,
        },
        {
            name: "harry",
            sub: "Blockchain Developer",
            detail: strings.harry_word,
            image: harry,
        },
        {
            name: "eric",
            sub: "Blockchain Developer",
            detail: strings.eric_word,
            image: eric,
        },
        {
            name: "jinger",
            sub: "SUB",
            detail: strings.jinger_word,
            image: jinger,
        },
        {
            name: "justin",
            sub: "Frontend Developer",
            detail: strings.justin_word,
            image: justin,
        },
        {
            name: "mini",
            sub: "Frontend Developer",
            detail: strings.mini_word,
            image: mini,
        },
        {
            name: "mia",
            sub: "Animator",
            detail: strings.mia_word,
            image: mia,
        },
        {
            name: "rose",
            sub: "Graphic Designer",
            detail: strings.rose_word,
            image: rose,
        },
        {
            name: "wilson",
            sub: "UI/UX Designer",
            detail: strings.wilson_word,
            image: wilson,
        },
    ],

    roadmapContents: [
        {
            title: strings.roadmap_title_1,
            date: "2022.03",
            description: strings.roadmap_description_1,
            icon: <CheckRounded fontSize={"small"} />,
            isColored: true,
        },
        {
            title: strings.roadmap_title_2,
            date: "2022.05",
            description: strings.roadmap_description_2,
            icon: <CheckRounded fontSize={"small"} />
        },
        {
            title: strings.roadmap_title_3,
            date: "2022.06",
            description: strings.roadmap_description_3,
            icon: <MoreHoriz fontSize={"small"} />
        },
    ]

}