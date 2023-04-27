import { setLimit, setOffset, setValue } from "@datastore/app/pokemonsSlice";
import { Reducer } from "@datastore/app/store";
import {
    Box,
    Typography,
    Grid,
    capitalize,
    Select,
    MenuItem,
    FormControl,
    Modal,
} from "@material-ui/core";
import { Pagination, Skeleton } from "@material-ui/lab";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import PokemonItem, { avoidWhiteColor, typeColor } from "./item";
import PokemonModal from "./modal";

function PokemonsList() {
    const limit = useSelector<Reducer>(
        (state) => state.pokemon.limit,
    ) as number;
    const pokemons = useSelector<Reducer>(
        (state) => state.pokemon.pokemons,
    ) as Reducer["pokemon"]["pokemons"];
    const offset = useSelector<Reducer>(
        (state) => state.pokemon.offset,
    ) as number;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);
    const handleOpen = React.useCallback(
        (id: string) => {
            if (!pokemons.list) return;
            setSelectedPokemon(pokemons.list.find((item) => item.id === id));
            setOpen(true);
        },
        [pokemons],
    );
    const handleClose = () => {
        setOpen(false);
        setSelectedPokemon(null);
    };
    const { isLoading } = useSWR([limit, offset], async (deps) => {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${deps[0]}&offset=${
                deps[1] === 1 ? 0 : deps[1] * limit
            }`,
        );
        const pokemons = await Promise.all(
            data.results.map(
                async (res: { url: string }) => (await axios.get(res.url)).data,
            ),
        );
        const result = { count: data.count, list: pokemons };
        dispatch(setValue(result));
        return result;
    });
    const paginations = React.useMemo(
        () => Math.round(pokemons?.count / limit),
        [pokemons?.count, limit],
    );
    const handleChangePagination = React.useCallback(
        (event: React.ChangeEvent<unknown>, value: number) => {
            dispatch(setOffset(value));
        },
        [dispatch],
    );
    const handleChangeLimit = React.useCallback((event: any) => {
        dispatch(setLimit(event.target.value as string));
        dispatch(setOffset(1));
    }, []);
    return (
        <Box
            height={"auto"}
            bgcolor={"var(--secondary-yellow-500)"}
            position={"relative"}
            overflow={"hidden"}
            padding={"90px"}
        >
            <div
                style={{
                    height: "300px",
                    width: "482.1px",
                    borderRadius: "100%",
                    border: "250px solid #FFD86C",
                    position: "absolute",
                    top: "-400px",
                    left: "-500px",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    height: "300px",
                    width: "482.1px",
                    borderRadius: "100%",
                    border: "250px solid #FFD86C",
                    position: "absolute",
                    bottom: "-450px",
                    right: "-500px",
                    zIndex: 0,
                }}
            />
            <Box display={"flex"} flexDirection={"column"} marginX={"150px"}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    zIndex={10}
                >
                    <Typography
                        variant="h3"
                        component="p"
                        style={{ fontWeight: "bold" }}
                    >
                        PokèDex
                    </Typography>
                    <Box m="5" height={30} />
                    <Typography variant="h5" component="p">
                        {t("homepage:pokedex-desc")}
                    </Typography>
                    <Box height={5} />
                    <Typography variant="h5" component="p">
                        {pokemons?.count} Pokèmon
                    </Typography>
                </Box>
                <Box m="5" height={50} />
                <Grid container style={{ zIndex: 10 }} spacing={10}>
                    {(isLoading && !pokemons?.list
                        ? Array.from(new Array(limit))
                        : pokemons.list
                    ).map((item, idx) => (
                        <PokemonItem
                            handleOpen={handleOpen}
                            item={item}
                            key={idx}
                        />
                    ))}
                </Grid>
                <Box height={100} />
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    color={"white"}
                    sx={{
                        // @ts-ignore
                        "& .MuiPaginationItem-outlined": {
                            color: "white",
                            fontWeight: "bold",
                            outline: "1px solid white",
                            border: "1px solid white",
                            height: "60px",
                            width: "60px",
                        },
                    }}
                    zIndex={10}
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Typography
                            variant="h6"
                            component="p"
                            style={{ fontWeight: "bold" }}
                        >
                            {t("homepage:per-page")}
                        </Typography>
                        <FormControl variant="outlined">
                            <Select
                                labelId="offset"
                                id="offset"
                                autoWidth
                                value={limit}
                                onChange={handleChangeLimit}
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    outline: "1px solid white",
                                    border: "1px solid white",
                                    margin: "0px 30px",
                                }}
                            >
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                                <MenuItem value={22}>22</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Pagination
                        count={paginations}
                        page={offset}
                        onChange={handleChangePagination}
                        variant="outlined"
                        shape="rounded"
                        size="large"
                    />
                    <Typography
                        variant="h6"
                        component="p"
                        style={{ fontWeight: "bold" }}
                    >
                        Total data: {pokemons?.count}
                    </Typography>
                </Box>
            </Box>
            <PokemonModal
                handleClose={handleClose}
                open={open}
                selectedPokemon={selectedPokemon}
            />
        </Box>
    );
}

export default PokemonsList;
