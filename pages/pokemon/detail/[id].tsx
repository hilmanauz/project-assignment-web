import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    Box,
    Button,
    Container,
    Grid,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    capitalize,
} from "@material-ui/core";
import Navbar from "@components/navbar";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { typeColor, avoidWhiteColor } from "@components/pokemon/item";

const evolutionSummarize = (chain) => {
    if (!chain.evolves_to.length) return chain.species;
    return [chain.species].concat(evolutionSummarize(chain.evolves_to[0]));
};

const DetailPokemon: FC = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const { t } = useTranslation();
    const router = useRouter();
    const { data, isLoading } = useSWR(
        `https://pokeapi.co/api/v2/pokemon/${router.query.id}`,
        async (url: string) => {
            const { data: pokeData } = await axios.get(url);
            const { data: speciesData } = await axios.get(pokeData.species.url);
            const { data: evolutionData } = await axios.get(
                speciesData.evolution_chain.url,
            );
            const allEvolutions = evolutionSummarize(evolutionData.chain);
            const evolutionDetail = await Promise.all(
                allEvolutions.map(
                    async (evol) =>
                        (
                            await axios.get(
                                `https://pokeapi.co/api/v2/pokemon/${evol.name}`,
                            )
                        ).data,
                ),
            );
            return { evolutionData, speciesData, evolutionDetail, pokeData };
        },
    );
    React.useEffect(() => {
        if (!data?.evolutionDetail && !data?.pokeData) return;
        setActiveStep(
            data.evolutionDetail.findIndex(
                (evo) => evo.name === data.pokeData.name,
            ),
        );
    }, [data?.evolutionData, data?.pokeData]);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (isLoading)
        return (
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100vh"}
                width={"100vw"}
            >
                <img src="/image_5.png" alt="" width={500} height={150} />
            </Box>
        );

    return (
        <Box
            height={"100vh"}
            width={"auto"}
            position={"relative"}
            display={"flex"}
        >
            <Navbar />
            <Box
                display={"flex"}
                alignItems={"center"}
                paddingTop={"88px"}
                paddingX={"142px"}
                flexGrow={1}
            >
                <Box
                    width={"60%"}
                    height={"75vh"}
                    display={"flex"}
                    flexDirection={"column"}
                    padding={"20px"}
                    style={{
                        border: "1px solid gray",
                        borderTopLeftRadius: "14px",
                        borderBottomLeftRadius: "14px",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="span"
                        style={{
                            fontWeight: "bold",
                            borderBottom: "2px solid #ECEDED",
                            width: "fit-content",
                        }}
                    >
                        {capitalize(data?.pokeData.name || "")} Biodata
                    </Typography>
                    <Box display={"flex"}>
                        <img
                            src={
                                data?.pokeData.sprites.other[
                                    "official-artwork"
                                ]["front_default"] || "/placeholder.png"
                            }
                            width={"350px"}
                            height={"350px"}
                            alt="/placeholder.png"
                        />
                        <Box
                            width={"55%"}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            paddingLeft={"10px"}
                        >
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    variant="h6"
                                    component="span"
                                    style={{
                                        fontWeight: "bold",
                                        letterSpacing: 3,
                                    }}
                                >
                                    {t(`stats:weight`)}:{" "}
                                </Typography>
                                {data?.pokeData.weight}
                            </Box>
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    variant="h6"
                                    component="span"
                                    style={{
                                        fontWeight: "bold",
                                        letterSpacing: 3,
                                    }}
                                >
                                    {t(`stats:height`)}:{" "}
                                </Typography>
                                {data?.pokeData.height}
                            </Box>
                            {data?.pokeData.stats.map((stat, idx) => (
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    key={idx}
                                >
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        style={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                        }}
                                    >
                                        {capitalize(
                                            t(`stats:${stat.stat.name}`),
                                        )}
                                        :
                                    </Typography>
                                    {stat.base_stat}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Box display={"flex"}>
                            <Typography
                                variant="h6"
                                component="span"
                                style={{
                                    fontWeight: "bold",
                                    letterSpacing: 3,
                                }}
                            >
                                {t(`stats:abilities`)}:{" "}
                            </Typography>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                paddingX={"10px"}
                                paddingY={"5px"}
                                width={"100%"}
                            >
                                {data?.pokeData.abilities.map(
                                    (ability, idx) => (
                                        <div key={idx}>
                                            <Box
                                                padding={"5px 10px"}
                                                bgcolor={"#E0E0E0"}
                                                borderRadius={"10px"}
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                                key={idx}
                                                style={{
                                                    color: ability.is_hidden
                                                        ? "gray"
                                                        : "black",
                                                    cursor: "default",
                                                }}
                                                title={
                                                    ability.is_hidden
                                                        ? "hidden"
                                                        : undefined
                                                }
                                            >
                                                {capitalize(
                                                    ability.ability.name,
                                                )}
                                                <span
                                                    title="Skill cost"
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                >
                                                    {Array.from(
                                                        new Array(ability.slot),
                                                    ).map(() => (
                                                        <>&#9889;</>
                                                    ))}
                                                </span>
                                            </Box>
                                            <Box height={10} />
                                        </div>
                                    ),
                                )}
                            </Box>
                        </Box>
                        <Box m="5" height={10} />
                        <Box display={"flex"} alignItems={"center"}>
                            <Typography
                                variant="h6"
                                component="span"
                                style={{
                                    fontWeight: "bold",
                                    letterSpacing: 3,
                                }}
                            >
                                {t(`stats:types`)}:{" "}
                            </Typography>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                paddingX={"10px"}
                                paddingY={"5px"}
                                width={"100%"}
                            >
                                <Grid container spacing={5}>
                                    {data?.pokeData.types?.map((type, id) => (
                                        <Grid item lg={6} key={id}>
                                            <Box
                                                textAlign={"center"}
                                                bgcolor={
                                                    typeColor[type.type.name]
                                                }
                                                padding={"8px 5px"}
                                                borderRadius={"14px"}
                                                color={
                                                    avoidWhiteColor.has(
                                                        type.type.name,
                                                    )
                                                        ? "black"
                                                        : "white"
                                                }
                                                sx={{
                                                    // @ts-ignore
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        boxShadow:
                                                            "5px 8px 20px rgba(0, 0, 0, 0.2)",
                                                    },
                                                }}
                                                onClick={() => {
                                                    router.push(
                                                        `/pokemon/pokedex-type/${type.type.bane}`,
                                                    );
                                                }}
                                                fontWeight={"bold"}
                                            >
                                                {capitalize(type.type.name)}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    width={"40%"}
                    height={"75vh"}
                    display={"flex"}
                    flexDirection={"column"}
                    bgcolor={"var(--secondary-yellow-500)"}
                    padding={"20px"}
                    style={{
                        border: "1px solid var(--secondary-yellow-500)",
                        borderTopRightRadius: "14px",
                        borderBottomRightRadius: "14px",
                    }}
                    position={"relative"}
                    overflow={"hidden"}
                >
                    <div
                        style={{
                            height: "200px",
                            width: "382.1px",
                            borderRadius: "100%",
                            border: "150px solid #FFD86C",
                            position: "absolute",
                            top: "-250px",
                            right: "-425px",
                            zIndex: 0,
                        }}
                    />
                    <Typography
                        variant="h4"
                        component="span"
                        style={{
                            fontWeight: "bold",
                            borderBottom: "2px solid #ECEDED",
                            width: "fit-content",
                            zIndex: 10,
                        }}
                    >
                        {t(`stats:evolution-section`)}:{" "}
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                        style={{
                            backgroundColor: "transparent",
                            zIndex: 10,
                        }}
                    >
                        {data?.evolutionDetail.map((item, index) => (
                            <Step key={item.name}>
                                <StepLabel>
                                    <Typography
                                        style={{
                                            fontWeight: "700",
                                            cursor: "pointer",
                                            color: "white",
                                            width: "fit-content",
                                        }}
                                        onClick={() => setActiveStep(index)}
                                    >
                                        {capitalize(item.name)}
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <img
                                        src={
                                            item.sprites.other[
                                                "official-artwork"
                                            ]["front_default"] ||
                                            "/placeholder.png"
                                        }
                                        onClick={() => {
                                            router.push(
                                                `/pokemon/detail/${item.id}`,
                                            );
                                        }}
                                        style={{ cursor: "pointer" }}
                                        width={"75%"}
                                        height={"75%"}
                                        alt="/placeholder.png"
                                    />
                                    <Box width={"100%"} display={"flex"}>
                                        <Button
                                            disabled={
                                                index ===
                                                data?.evolutionDetail.length - 1
                                            }
                                            variant="contained"
                                            onClick={handleNext}
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                                width: "50%",
                                            }}
                                        >
                                            &#8595;
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            variant="outlined"
                                            onClick={handleBack}
                                            style={{
                                                marginLeft: "20px",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                                width: "50%",
                                            }}
                                        >
                                            &#8593;
                                        </Button>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Box>
        </Box>
    );
};

export default DetailPokemon;
