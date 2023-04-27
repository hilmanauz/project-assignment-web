import { Grid, Box, Typography, capitalize } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export const typeColor = {
    normal: "#FFE0B2",
    fighting: "#FF8A65",
    flying: "#EEEEEE",
    poison: "#AB47BC",
    ground: "#6D4C41",
    rock: "#424242",
    bug: "#827717",
    ghost: "#37474F",
    steel: "#B0BEC5",
    fire: "#E64A19",
    water: "#1E88E5",
    grass: "#4CAF50",
    electric: "#FFEB3B",
    psychic: "#EF5350",
    ice: "#84FFFF",
    dragon: "#FF3D00",
    dark: "#212121",
    fairy: "#E1F5FE",
    unknown: "#FAFAFA",
    shadow: "#ECEFF1",
};

export const avoidWhiteColor = new Set([
    "flying",
    "ice",
    "shadow",
    "unknown",
    "fairy",
    "electric",
    "all",
]);

function PokemonItem({
    item,
    handleOpen,
}: {
    item: any;
    handleOpen: (id: string) => void;
}) {
    return (
        <Grid item lg={4}>
            <Box
                onClick={() => {
                    handleOpen(item.id);
                }}
                borderRadius={"24px"}
                bgcolor={"white"}
                padding={"45px 25px"}
                sx={{
                    // @ts-ignore
                    cursor: "pointer",
                    "&:hover": {
                        boxShadow: "5px 10px 25px rgba(0, 0, 0, 0.35)",
                    },
                }}
                display={"flex"}
                flexDirection={"column"}
            >
                {item ? (
                    <img
                        src={
                            item.sprites.other["official-artwork"][
                                "front_default"
                            ] || "/placeholder.png"
                        }
                        alt="/placeholder.png"
                    />
                ) : (
                    <Skeleton variant="rect" width={300} height={300} />
                )}
                {item ? (
                    <>
                        <Typography
                            variant="h5"
                            component="p"
                            color="textSecondary"
                            style={{ fontWeight: "bold" }}
                        >
                            #
                            {item.id.toLocaleString(undefined, {
                                useGrouping: false,
                                minimumIntegerDigits: 5,
                            })}
                        </Typography>
                        <Box height={5} />
                        <Typography
                            variant="h4"
                            component="p"
                            style={{ fontWeight: "700" }}
                        >
                            {capitalize(item.name)}
                        </Typography>
                        <Box height={15} />
                        <Grid container spacing={5}>
                            {item.types?.map((type, id) => (
                                <Grid item lg={6} key={id}>
                                    <Box
                                        textAlign={"center"}
                                        bgcolor={typeColor[type.type.name]}
                                        padding={"8px 5px"}
                                        borderRadius={"14px"}
                                        color={
                                            avoidWhiteColor.has(type.type.name)
                                                ? "black"
                                                : "white"
                                        }
                                        fontWeight={"bold"}
                                    >
                                        {capitalize(type.type.name)}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                )}
            </Box>
        </Grid>
    );
}

export default PokemonItem;
