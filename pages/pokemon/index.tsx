import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    Box,
    BoxProps,
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import PokemonsList from "@components/pokemon/list";
import Navbar from "@components/navbar";

const PokemonList: FC = () => {
    const theme = useTheme();
    const listRef = React.useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const route = useRouter();
    const { locale } = route;
    return (
        <Box height={"auto"} width={"auto"} position={"relative"}>
            <Navbar />
            <Box
                marginX={"142px"}
                height={"100vh"}
                alignItems={"center"}
                display={"flex"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignContent={"center"}
                    width={"100vw"}
                >
                    <Box
                        width={"534px"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                    >
                        <Typography
                            align="left"
                            variant="h2"
                            component="span"
                            gutterBottom
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {t("homepage:header")}
                        </Typography>
                        <Typography
                            align="left"
                            variant="h6"
                            component="span"
                            color="textSecondary"
                            gutterBottom
                        >
                            {t("homepage:desc")}
                        </Typography>
                        <br />
                        <Button
                            variant="contained"
                            style={{
                                borderRadius: "14px",
                                width: "240px",
                                textTransform: "none",
                                fontWeight: "bold",
                                backgroundColor: "var(--active-button)",
                                color: "white",
                                fontSize: "20px",
                            }}
                            size="large"
                            fullWidth={false}
                            onClick={() => {
                                listRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            {t("homepage:check-button")}
                        </Button>
                    </Box>
                    <Box>
                        <img
                            style={{
                                maxHeight: "702px",
                                maxWidth: "634px",
                            }}
                            src={`/Group_290.png`}
                            srcSet={`/Group_290.png`}
                            alt={"dashboard"}
                            loading="lazy"
                        />
                    </Box>
                </Box>
            </Box>
            <div ref={listRef}>
                <PokemonsList />
            </div>
        </Box>
    );
};

export default PokemonList;
