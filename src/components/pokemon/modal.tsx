import {
    Modal,
    Box,
    Grid,
    Typography,
    capitalize,
    Button,
} from "@material-ui/core";
import React from "react";
import { typeColor, avoidWhiteColor } from "./item";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "18px",
    boxShadow: 24,
    p: 4,
    "&:focus-visible": {
        outline: "none",
    },
};

function PokemonModal({
    open,
    handleClose,
    selectedPokemon,
}: {
    open: boolean;
    handleClose: () => void;
    selectedPokemon: any;
}) {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            autoFocus={false}
        >
            <Box sx={style}>
                <Grid container spacing={5}>
                    <Button
                        style={{
                            position: "absolute",
                            right: "30px",
                            top: "20px",
                            fontWeight: "bold",
                            color: "gray",
                            fontSize: "20px",
                            minWidth: "36px",
                        }}
                        variant={"text"}
                        size="small"
                        onClick={handleClose}
                    >
                        X
                    </Button>
                    <Grid item xs={5}>
                        <img
                            width={400}
                            height={400}
                            src={
                                selectedPokemon?.sprites.other[
                                    "official-artwork"
                                ]["front_default"] || "/placeholder.png"
                            }
                            loading={"lazy"}
                            alt="/placeholder.png"
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            height={"100%"}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                flexGrow={1}
                            >
                                <Typography
                                    id="modal-modal-title"
                                    variant="h3"
                                    component="h2"
                                    style={{
                                        fontWeight: "bold",
                                        letterSpacing: 3,
                                    }}
                                >
                                    {capitalize(selectedPokemon?.name || "")}
                                </Typography>
                                <Box m="5" height={35} />
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            style={{
                                                fontWeight: "bold",
                                                letterSpacing: 3,
                                            }}
                                        >
                                            {t("stats:weight")}:{" "}
                                        </Typography>
                                        {selectedPokemon?.weight}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            style={{
                                                fontWeight: "bold",
                                                letterSpacing: 3,
                                            }}
                                        >
                                            {t("stats:height")}:{" "}
                                        </Typography>
                                        {selectedPokemon?.height}
                                    </Grid>
                                </Grid>
                                <Box height={5} />
                                <Box display={"flex"}>
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        style={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                        }}
                                    >
                                        {t("stats:abilities")}:{" "}
                                    </Typography>
                                    <Box
                                        display={"flex"}
                                        flexDirection={"column"}
                                        paddingX={"10px"}
                                        paddingY={"5px"}
                                        width={"100%"}
                                    >
                                        {selectedPokemon?.abilities.map(
                                            (ability, idx) => (
                                                <div key={idx}>
                                                    <Box
                                                        padding={"5px 10px"}
                                                        bgcolor={"#E0E0E0"}
                                                        borderRadius={"10px"}
                                                        display={"flex"}
                                                        justifyContent={
                                                            "space-between"
                                                        }
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
                                                            ability.ability
                                                                .name,
                                                        )}
                                                        <span
                                                            title="Skill cost"
                                                            style={{
                                                                marginLeft:
                                                                    "10px",
                                                            }}
                                                        >
                                                            {Array.from(
                                                                new Array(
                                                                    ability.slot,
                                                                ),
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
                                <Box display={"flex"}>
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        style={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                        }}
                                    >
                                        {t("stats:types")}:{" "}
                                    </Typography>
                                    <Box
                                        display={"flex"}
                                        flexDirection={"column"}
                                        paddingX={"10px"}
                                        paddingY={"5px"}
                                        width={"100%"}
                                    >
                                        <Grid container spacing={5}>
                                            {selectedPokemon?.types?.map(
                                                (type, id) => (
                                                    <Grid item lg={6} key={id}>
                                                        <Box
                                                            textAlign={"center"}
                                                            bgcolor={
                                                                typeColor[
                                                                    type.type
                                                                        .name
                                                                ]
                                                            }
                                                            padding={"8px 5px"}
                                                            borderRadius={
                                                                "14px"
                                                            }
                                                            color={
                                                                avoidWhiteColor.has(
                                                                    type.type
                                                                        .name,
                                                                )
                                                                    ? "black"
                                                                    : "white"
                                                            }
                                                            fontWeight={"bold"}
                                                        >
                                                            {capitalize(
                                                                type.type.name,
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                ),
                                            )}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
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
                                onClick={() => {
                                    router.push(
                                        `/pokemon/detail/${selectedPokemon.id}`,
                                    );
                                }}
                                size="large"
                                fullWidth={false}
                            >
                                {t("homepage:more-button")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default PokemonModal;
