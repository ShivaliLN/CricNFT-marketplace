import React, { useState, useEffect, useMemo } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import logo from './CricNFTApp.png';
import {abi} from './CricNFTMint.json';
import {
	Flex,
	Box,
	Spacer,
	Heading,
	Button,
	Stack,
	Input,
	NumberInput,
	NumberInputField,
	Image, 
	UnorderedList,
	ListItem,
  Grid,
} from "@chakra-ui/react";
import "./App.css";
//import "./main.js";
//const serverUrl = "https://d4fpdskt1gdn.usemoralis.com:2053/server";
//const appId = "6ofKR8HYDuvsK4oOvy52xA0OFJTWNv0zFzgBj5Si";
//Moralis.start({ serverUrl, appId });

function App() {
	const {
		Moralis,
		user,
		logout,
		authenticate,
		enableWeb3,
		isInitialized,
		isAuthenticated,
		isWeb3Enabled,
	} = useMoralis();
	const [values, setValues] = useState({ tokenAddress: "", tokenId: "", mintTokenId: "", amount:"", totalPrice: "" });
	const web3Account = useMemo(
		() => isAuthenticated && user.get("accounts")[0],
		[user, isAuthenticated],
	);
	
	const nftProperty1 = {
		imageUrl: "https://ipfs.io/ipfs/QmVXVmqPUFh5qUT9dBARUK5knXKE6o9CqgQ6nfLSjwQBfH",
		rate: 0.023,
		tokenId: 1,
	  }

	  const nftProperty2 = {
		imageUrl: "https://ipfs.io/ipfs/QmfGpo65TPGBMpwsWjwP9H4TB1ZPTyVReRhtFXSZt2fpu8",
		rate: 0.1,
		tokenId: 2,
	  }

	  const nftProperty3 = {
		imageUrl: "https://ipfs.io/ipfs/QmQgecSUYoAjsMkX3CLrPTKgkk6BxCb7Egc6R7FmJ2ieQ4",
		rate: 0.001,
		tokenId: 3,
	  }

	  const nftProperty4 = {
		imageUrl: "https://ipfs.io/ipfs/QmaMxpJceYaQdz9VKjHqS7KgBDh6myJsCi3zHMKf5MkzjF",
		rate: 0.1,
		tokenId: 4,
	  }

	  const nftProperty5 = {
		imageUrl: "https://ipfs.io/ipfs/QmQBYKQyEHdJ51aMpnfwrhZKVj448f4gyTqh75w4rbSvB3",
		rate: 0.1,
		tokenId: 5,
	  }
	  

	const getNFT = async () => {
		let web3 = await Moralis.Web3.enableWeb3();
		let promises = [
			Moralis.Cloud.run("addToken", {}),
		  ];
		  let results = await Promise.all(promises);
		  //console.log(results[0][0].attributes.teamAddress)
		  //console.log(results[0][0].attributes.seasonId)
		  console.log(results)
		  console.log(results[0][4].attributes.imageCID)
		  console.log(web3.utils.fromWei(results[0][4].attributes.rate))
		  console.log(results[0][4].attributes.supply)		  
		  //console.log(res);
	};
	
	
		const mint = async () => {
			let web3 = await Moralis.Web3.enableWeb3();
			let address = "0x501D0799131003e16089e881C5Bfe3073C2a8bC5";
			const contract = new web3.eth.Contract(abi, address.toLowerCase() );
			
			let receipt = await contract.methods
			  .mint(values.mintTokenId,values.amount)
			  .send({ from: user.attributes.ethAddress, value: web3.utils.toWei("0.5") })	
			  .then((response) => console.log(response))
		  };

	const getAsset = async () => {
		const res = await Moralis.Plugins.opensea.getAsset({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
		});
		console.log(res);
	};

	const getOrder = async () => {
		const res = await Moralis.Plugins.opensea.getOrders({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			orderSide: 0,
			page: 1, // pagination shows 20 orders each page
		});
		console.log(res);
	};

	const createSellOrder = async () => {
		const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
		const startAmount = 1;
		const endAmount = 1;

		await Moralis.Plugins.opensea.createSellOrder({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			tokenType: "ERC1155",
			userAddress: web3Account,
			startAmount,
			endAmount,
			expirationTime: startAmount > endAmount && expirationTime, // Only set if you startAmount > endAmount
		});

		console.log("Create Sell Order Successful");
	};

	const createBuyOrder = async () => {
		await Moralis.Plugins.opensea.createBuyOrder({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			tokenType: "ERC721",
			amount: 0.0001,
			userAddress: web3Account,
			paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
		});

		console.log("Create Buy Order Successful");
	};

	useEffect(() => {
		if (isInitialized) {
			Moralis.initPlugins();
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled) {
			enableWeb3();
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<>
			<Flex sx={{ margin: 3 }}>				
				<Spacer />
				<Box>
					{isAuthenticated ? (
						<Flex justifyContent="center" alignItems="center">
							<div>{web3Account}</div>							
							<Button
								colorScheme="teal"
								sx={{ ml: 3 }}
								onClick={() => logout()}
							>
								Logout
							</Button>
						</Flex>
					) : (
						<Button colorScheme="teal" onClick={() => authenticate()}>
							Connect to Metamask
						</Button>						
					)}
				</Box>
			</Flex>
			<Flex sx={{ margin: 3 }}>				
				<Box p="2">
					<div style={{float: 'left'}}><img src={logo}  alt="Logo" width="125" height="130" /></div>
				</Box>
				<Spacer />				
			</Flex>
			<Flex sx={{ margin: 3 }} >				
				<Box p="2">
					<Heading size="md">CricNFT - MarketPlace</Heading>
					<Button style={{backgroundColor: 'black', color:"white", fontFamily:"cursive", width:"100px",height: '30px'}}onClick={getNFT}>Get NFT</Button>
				</Box>
				<Spacer />
			</Flex>	
			<Grid templateColumns="repeat(5, 1fr)" gap={6}>
  				
				  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      					<Image  borderRadius="full"  boxSize="200px"src={nftProperty1.imageUrl}/>            
          				<Box>
							<UnorderedList>
  							<ListItem>Token Id: {nftProperty1.tokenId}</ListItem>
  							<ListItem>Rate: {nftProperty1.rate} (ETH/MATIC)</ListItem>
 							</UnorderedList>    
          				</Box>
					</Box>
  				
				  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      					<Image  borderRadius="full"  boxSize="200px"src={nftProperty2.imageUrl}/>            
          				<Box>
							<UnorderedList>
  							<ListItem>Token Id: {nftProperty2.tokenId}</ListItem>
  							<ListItem>Rate: {nftProperty2.rate} (ETH/MATIC)</ListItem>
 							</UnorderedList>    
          				</Box>
					</Box>
					<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      					<Image  borderRadius="full"  boxSize="200px"src={nftProperty3.imageUrl}/>            
          				<Box>
							<UnorderedList>
  							<ListItem>Token Id: {nftProperty3.tokenId}</ListItem>
  							<ListItem>Rate: {nftProperty3.rate} (ETH/MATIC)</ListItem>
 							</UnorderedList>    
          				</Box>
					</Box>
					<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      					<Image  borderRadius="full"  boxSize="200px"src={nftProperty4.imageUrl}/>            
          				<Box>
							<UnorderedList>
  							<ListItem>Token Id: {nftProperty4.tokenId}</ListItem>
  							<ListItem>Rate: {nftProperty4.rate} (ETH/MATIC)</ListItem>
 							</UnorderedList>    
          				</Box>
					</Box>

					<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      					<Image  borderRadius="full"  boxSize="200px"src={nftProperty5.imageUrl}/>            
          				<Box>
							<UnorderedList>
  							<ListItem>Token Id: {nftProperty5.tokenId}</ListItem>
  							<ListItem>Rate: {nftProperty5.rate} (ETH/MATIC)</ListItem>
 							</UnorderedList>    
          				</Box>
					</Box>
</Grid>	

			<Flex>
			<Box p="7">
				Enter Token Id:</Box >
			<Box p="7">
				<NumberInput
						min={0}
						value={values.mintTokenId}
						onChange={(valueString) =>
							setValues({ ...values, mintTokenId: valueString })
						}
					>
						<NumberInputField sx={{ borderColor: "1px solid black" }} />
					</NumberInput></Box>
					
					<Box  p="7">
						Enter Quantity:</Box >
					<Box p="7">
				<NumberInput
						min={0}
						value={values.amount}
						onChange={(valueString) =>
							setValues({ ...values, amount: valueString })
						}
					>
						<NumberInputField sx={{ borderColor: "1px solid black" }} />
					</NumberInput>
					</Box>
					<Box p="7" >						
					<Button style={{backgroundColor: 'black', color:"white", fontFamily:"cursive", width:"100px",height: '30px'}}onClick={mint}>Mint NFT</Button>
						</Box>				
						</Flex>
				
				<Box p="2">
					{/*<Heading size="xs">Moralis OpenSea Clone</Heading>*/}
					<h3>Moralis OpenSea Clone</h3>
				</Box>
			<Flex sx={{ margin: 3 }}>
			<Box>
			NFT Token Address:</Box >
				<Box w="15vw" sx={{ mr: 3 }}>
					<Input
						sx={{ borderColor: "1px solid black" }}
						placeholder=""
						onChange={(e) =>
							setValues({ ...values, tokenAddress: e.target.value })
						}
					/>
				</Box>
				<Box>
				Enter Token Id:</Box >
				<Box w="10vw">
					<NumberInput
						min={0}
						value={values.tokenId}
						onChange={(valueString) =>
							setValues({ ...values, tokenId: valueString })
						}
					>
						<NumberInputField sx={{ borderColor: "1px solid black" }} />
					</NumberInput>
				</Box>
			</Flex>
			
			<Stack direction="row" spacing={5} sx={{ margin: 5 }}>
			<Button style={{backgroundColor: 'black', color:"white", fontFamily:"cursive", width:"100px",height: '30px'}}onClick={getAsset}>Get Asset</Button>
				<Button style={{backgroundColor: 'black', color:"white", fontFamily:"cursive", width:"100px",height: '30px'}}onClick={getOrder}>Get Order</Button>
				{isAuthenticated && (
					<>
						<Button style={{backgroundColor: 'black', color:"white", fontFamily:"cursive", width:"150px",height: '30px'}}onClick={createBuyOrder}>Create Buy Order</Button>
						<Button style={{backgroundColor: 'black', color:"white", fontFamily:"cursive", width:"150px",height: '30px'}}onClick={createSellOrder}>Create Sell Order</Button>
					</>
				)}
				</Stack>
				
		</>
	);
}

export default App;