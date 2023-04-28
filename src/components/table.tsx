import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    MenuItem,
    Select,
    capitalize,
} from "@material-ui/core";
import * as React from "react";
import { avoidWhiteColor, typeColor } from "./pokemon/item";
import axios from "axios";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import useTranslation from "next-translate/useTranslation";

interface Column {
    id:
        | "name"
        | "weight"
        | "height"
        | "hp"
        | "attack"
        | "defense"
        | "special-attack"
        | "special-defense"
        | "speed"
        | "types";
    minWidth?: number;
    align?: "right" | "center";
    format?: (value: any) => string;
}

const columns: readonly Column[] = [
    {
        id: "name",
        minWidth: 170,
        format: (value: any) => capitalize(value),
    },
    { id: "weight", minWidth: 150, align: "center" },
    { id: "height", minWidth: 150, align: "center" },
    {
        id: "speed",
        minWidth: 170,
        align: "center",
    },
    {
        id: "hp",
        minWidth: 170,
        align: "center",
    },
    {
        id: "attack",
        minWidth: 170,
        align: "center",
    },
    {
        id: "defense",
        minWidth: 170,
        align: "center",
    },
    {
        id: "special-attack",
        minWidth: 170,
        align: "center",
    },
    {
        id: "special-defense",
        minWidth: 170,
        align: "center",
    },
    {
        id: "types",
        minWidth: 170,
        align: "center",
    },
];

const Pill = ({ val }: { val: Record<string, any> }) => (
    <Box
        textAlign={"center"}
        bgcolor={typeColor[val.type.name]}
        padding={"5px 5px"}
        borderRadius={"14px"}
        color={avoidWhiteColor.has(val.type.name) ? "black" : "white"}
        fontWeight={"bold"}
    >
        {capitalize(val.type.name)}
    </Box>
);

interface Data {
    name: string;
    weight: string;
    height: string;
    hp: string;
    attack: string;
    defense: string;
    "special-attack": string;
    "special-defense": string;
    speed: string;
    types: Record<string, any>[];
}

function EnhancedTableToolbar() {
    const router = useRouter();
    const { t } = useTranslation();
    const handleChangeType = React.useCallback(
        (event: React.ChangeEvent<unknown>, value: any) => {
            router.push(value.props.value);
        },
        [],
    );
    const type = router.query.type as string;
    return (
        <Toolbar
            style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: typeColor[type],
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
                paddingBlock: "10px",
            }}
        >
            <Typography
                variant="h6"
                id="tableTitle"
                component="div"
                style={{
                    color: avoidWhiteColor.has(type) ? "black" : "white",
                    fontWeight: "bold",
                }}
            >
                {t("stats:pokedex-type")}
            </Typography>
            <Select
                variant="outlined"
                value={router.query.type}
                placeholder="mama"
                style={{
                    backgroundColor: typeColor[type],
                    color: avoidWhiteColor.has(type) ? "black" : "white",
                    fontWeight: "bold",
                    outline: `1px solid ${typeColor[type]}`,
                    border: `1px solid ${typeColor[type]}`,
                    width: "15%",
                }}
                onChange={handleChangeType}
            >
                {Object.entries(typeColor).map(([key, value], idx) => (
                    <MenuItem
                        value={key}
                        key={idx}
                        style={{
                            backgroundColor: value,
                            color: avoidWhiteColor.has(key) ? "black" : "white",
                        }}
                    >
                        {capitalize(key)}
                    </MenuItem>
                ))}
            </Select>
        </Toolbar>
    );
}

export default function TablePokemon() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { t } = useTranslation();
    const router = useRouter();
    const [type, setType] = React.useState("");
    React.useEffect(() => {
        setType(router.query.type as string);
    }, [router.query.type]);
    const { data, isLoading } = useSWR(type, async (type: string) => {
        const { data: typeData } = await axios.get(
            `https://pokeapi.co/api/v2/type/${type}`,
        );
        const typesData = await Promise.all(
            typeData.pokemon.map(async (pokemon) => {
                const result = (await axios.get(pokemon.pokemon.url)).data;
                const stats = Object.fromEntries(
                    result.stats.map((stat) => [
                        stat.stat.name,
                        stat.base_stat,
                    ]),
                );
                return {
                    id: result.id,
                    name: result.name,
                    height: result.height,
                    weight: result.weight,
                    types: result.types,
                    ...stats,
                };
            }),
        );
        return typesData;
    });
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
            <EnhancedTableToolbar />
            {isLoading ? (
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    width={"100%"}
                    maxHeight={"65vh"}
                >
                    <img src="/loading.gif" alt="" width={500} height={500} />
                    <Typography
                        variant="h6"
                        component="span"
                        style={{
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        Loading...
                    </Typography>
                </Box>
            ) : (
                <>
                    <TableContainer style={{ maxHeight: "65vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {t(`stats:${column.id}`)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    ?.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage,
                                    )
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                tabIndex={-1}
                                                key={row.name}
                                                onClick={() => {
                                                    router.push(
                                                        `/pokemon/detail/${row.id}`,
                                                    );
                                                }}
                                            >
                                                {columns.map((column) => {
                                                    const value =
                                                        row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {typeof value ===
                                                                "string" ||
                                                            typeof value ===
                                                                "number"
                                                                ? column.format?.(
                                                                      value,
                                                                  ) || value
                                                                : value.map(
                                                                      (
                                                                          val,
                                                                          idx,
                                                                      ) => (
                                                                          <div
                                                                              key={
                                                                                  idx
                                                                              }
                                                                          >
                                                                              <Pill
                                                                                  val={
                                                                                      val
                                                                                  }
                                                                              />
                                                                              {idx !==
                                                                                  value.length -
                                                                                      1 && (
                                                                                  <Box
                                                                                      height={
                                                                                          10
                                                                                      }
                                                                                  />
                                                                              )}
                                                                          </div>
                                                                      ),
                                                                  )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        style={{
                            backgroundColor: typeColor[type],
                            paddingBlock: "10px",
                            color: avoidWhiteColor.has(type)
                                ? "black"
                                : "white",
                        }}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={10}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </Box>
    );
}
