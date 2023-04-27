import Navbar from "@components/navbar";
import TablePokemon from "@components/table";
import { Box } from "@material-ui/core";
import React from "react";

function PokemonType() {
    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            position={"relative"}
            display={"flex"}
        >
            <Navbar />
            <Box
                display={"flex"}
                paddingTop={"88px"}
                paddingX={"142px"}
                position={"absolute"}
                overflow={"hidden"}
                style={{ inset: 0 }}
                flexGrow={1}
            >
                <Box padding={"30px"} width={"100%"}>
                    <TablePokemon />
                </Box>
            </Box>
        </Box>
    );
}

export default PokemonType;
