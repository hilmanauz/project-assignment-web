import { Box, MenuItem, Select, Typography } from "@material-ui/core";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

function Navbar() {
    const { t } = useTranslation();
    const router = useRouter();
    const { locale } = router;
    const handleChangeLanguage = async (event, value) => {
        await setLanguage(value.props.value);
    };
    return (
        <Box position={"absolute"} top={0} width={"100%"} zIndex={100}>
            <Box
                display={"flex"}
                alignItems={"center"}
                height={"88px"}
                marginX={"142px"}
            >
                <img
                    style={{
                        maxWidth: "167px",
                        maxHeight: "59px",
                        marginRight: "20px",
                    }}
                    src={`/image_5.png`}
                    srcSet={`/image_5.png`}
                    alt={"dashboard"}
                    loading="lazy"
                />
                <Box
                    sx={{
                        // @ts-ignore
                        marginInline: "20px",
                        "&:hover": {
                            borderBottom: "1px solid #ECEDED",
                        },
                        borderBottom:
                            router.pathname === "/pokemon"
                                ? "1px solid #ECEDED"
                                : "transparent",
                    }}
                >
                    <Typography
                        align="center"
                        variant="subtitle1"
                        component="span"
                        style={{
                            color:
                                router.pathname === "/pokemon"
                                    ? "var(--secondary-yellow-500)"
                                    : "var(--basic-neutral-700)",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            router.push("/pokemon");
                        }}
                    >
                        {t("navbar:navbar1")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        // @ts-ignore
                        marginInline: "20px",
                        "&:hover": {
                            borderBottom: "1px solid #ECEDED",
                        },
                        borderBottom: router.pathname.includes("/pokedex-type")
                            ? "1px solid #ECEDED"
                            : "transparent",
                    }}
                >
                    <Typography
                        align="center"
                        variant="subtitle1"
                        component="span"
                        style={{
                            color: router.pathname.includes("/pokedex-type")
                                ? "var(--secondary-yellow-400)"
                                : "var(--basic-neutral-700)",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            router.push("/pokedex-type/fire");
                        }}
                    >
                        {t("navbar:navbar2")}
                    </Typography>
                </Box>
                <Box marginLeft={"auto"}>
                    <Select
                        autoWidth
                        value={locale}
                        onChange={handleChangeLanguage}
                        variant={"outlined"}
                        style={{
                            fontWeight: "bold",
                            outline: "1px solid white",
                            border: "1px solid white",
                        }}
                    >
                        <MenuItem value={"id"}>Bahasa Indonesia</MenuItem>
                        <MenuItem value={"en"}>English</MenuItem>
                    </Select>
                </Box>
            </Box>
        </Box>
    );
}

export default Navbar;
