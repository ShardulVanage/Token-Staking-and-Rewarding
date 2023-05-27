import { Card, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { STAKE_TOKEN_ADDRESSES } from "../constants/adresses";

export default function StakeToken() {
    const address = useAddress();//store walllet address to check how much stakingtoken it has

    //use thirdweb  to interact with stakingtoken contract
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(STAKE_TOKEN_ADDRESSES);

    //usetokenbalance(fun) take  contract & wallet address how much token in contract and store it into tokenbalace
    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);

    return (
        <Card p={5}>
            <Stack>
                <Heading>Stake Token</Heading>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>
                        ${tokenBalance?.symbol}
                    </Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <Text>
                        {tokenBalance?.displayValue}
                    </Text>
                </Skeleton>
            </Stack>
        </Card>
    )
}