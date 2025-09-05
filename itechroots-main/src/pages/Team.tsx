import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Crown, Users } from "lucide-react";
import Spider from "@/components/Spider";
import SpiderWeb from "../components/SpiderWeb"

	const teamData = {
		core: [
			{
				id: 1,
				name: "Sujal Burande",
				post: "President",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "sujalburande291103@gmail.com",
				phone: "8625875244",
				social: {
					linkedin: "#", // Add actual LinkedIn profile link
				},
			},
			{
				id: 2,
				name: "Taniya Borkar",
				post: "President",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone provided
				social: {
					linkedin: "#",
				},
			},
			{
				id: 3,
				name: "Kedar Poul",
				post: "President",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "kedarpoul123@gmail.com",
				phone: "7972254823",
				social: {
					linkedin: "#",
				},
			},
			{
				id: 4,
				name: "Atharva Kumare",
				post: "Working President",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "atharvakumare13@gmail.com",
				phone: "9130233496",
				social: {
					linkedin: "#",
				},
			},
			{
				id: 5,
				name: "Kaustubh Kale",
				post: "Working President",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone provided
				social: {
					linkedin: "#",
				},
			},
			{
				id: 6,
				name: "Aryan Nair",
				post: "Working President",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone provided
				phone: "9623691955",
				social: {
					linkedin: "#",
				},
			},
			{
				id: 7,
				name: "Dhanashree Kshirsagar",
				post: "Vice President CSI",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone provided
				social: {
					linkedin: "#",
				},
			},
			{
				id: 8,
				name: "Raunak Kalamkhede",
				post: "Vice President Aura",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "raunakkalamkhede@gmail.com",
				phone: "7972047422",
				social: {
					linkedin: "#",
				},
			},
			{
				id: 9,
				name: "Riddhi Dongarwar",
				post: "Vice President Spirit",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "riddhidongarwar06@gmail.com",
				phone: "9421587915",
				social: {
					linkedin: "#",
				},
			},
			{
				id: 10,
				name: "Divyansh Katakwar",
				post: "Secretary CSI",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone provided
				social: {
					linkedin: "#",
				},
			},
			{
				id: 11,
				name: "Ayush Bodade",
				post: "Secretary Spirit/ Aura",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "bodadeayush@gmail.com",
				phone: "7719988303",
				social: {
					linkedin: "#",
				},
			},
			{
				id: 12,
				name: "Khushi Lakhe",
				post: "Treasurer",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "khushilakhe@gmail.com",
				phone: "8261801435",
				social: {
					linkedin: "#",
				},
			},
		],
		heads: [
			// Cultural Heads
			{
				id: 13,
				name: "Upasna Ukey",
				post: "Cultural Head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "uukey77@gmail.com",
				phone: "7796170734",
				social: { linkedin: "#" },
			},
			{
				id: 14,
				name: "Nidhi Nilewar",
				post: "Cultural Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "nidhinilewar@gmail.com",
				phone: "7066108078",
				social: { linkedin: "#" },
			},
			// Database Heads
			{
				id: 15,
				name: "Harsh Jadhav",
				post: "Database Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "harshsjadhav100@gmail.com",
				phone: "9028789803",
				social: { linkedin: "#" },
			},
			{
				id: 16,
				name: "Chinmay Tekade",
				post: "Database Head",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "tekadechinmay10@gmail.com",
				phone: "8421689811",
				social: { linkedin: "#" },
			},
			// Decoration Heads
			{
				id: 17,
				name: "Vishal Kotnod",
				post: "Decoration Head",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "vkotnod@gmail.com",
				phone: "8788611037",
				social: { linkedin: "#" },
			},
			{
				id: 18,
				name: "Prasad Selokar",
				post: "Decoration Head",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "prasadselokar@gmail.com",
				phone: "8208594404",
				social: { linkedin: "#" },
			},
			// Design Heads
			{
				id: 19,
				name: "Malay Lokhande",
				post: "Design Head",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 20,
				name: "Piyush Piprewar",
				post: "Design Head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "piyushpiprewar07@gmail.com",
				phone: "9623612124",
				social: { linkedin: "#" },
			},
			// Event Management Heads
			{
				id: 21,
				name: "Devanshu Bhure",
				post: "Event Management Head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "devanshubhure1@gmail.com",
				phone: "9359780422",
				social: { linkedin: "#" },
			},
			{
				id: 22,
				name: "Pranay Padole",
				post: "Event Management Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "pranaypadole860@gmail.com",
				phone: "7972806608",
				social: { linkedin: "#" },
			},
			// Literature Heads
			{
				id: 23,
				name: "Chaitrali Deshpande",
				post: "Literature Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "chaitrali1704@gmail.com",
				phone: "8600256984",
				social: { linkedin: "#" },
			},
			{
				id: 24,
				name: "Sanchit Yelne",
				post: "Literature Head",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "sanchityelne2004@gmail.com",
				phone: "7720028546",
				social: { linkedin: "#" },
			},
			// Photography & Videography Heads
			{
				id: 25,
				name: "Abhishek Dekate",
				post: "Photography & Videography Head",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "abhishekdekate15@gmail.com",
				phone: "7058317735",
				social: { linkedin: "#" },
			},
			{
				id: 26,
				name: "Anvesh Bhaskarwar",
				post: "Photography & Videography Head",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "anveshbhaskarwar999@gmail.com",
				phone: "9834962653",
				social: { linkedin: "#" },
			},
			// Publicity Heads
			{
				id: 27,
				name: "Kusum Hari",
				post: "Publicity Head",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "kusumhari7@gmail.com",
				phone: "8208702223",
				social: { linkedin: "#" },
			},
			{
				id: 28,
				name: "Hardik Zode",
				post: "Publicity Head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "hardikzode05@gmail.com",
				phone: "9970946079",
				social: { linkedin: "#" },
			},
			// Social Media Heads
			{
				id: 29,
				name: "Aniket Ramteke",
				post: "Social Media Head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 30,
				name: "Varun Kursange",
				post: "Social Media Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			// Sports Heads
			{
				id: 31,
				name: "Priyanshu Dange",
				post: "Sports Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "dangepriyanshu25@gmail.com",
				phone: "8830738326",
				social: { linkedin: "#" },
			},
			{
				id: 32,
				name: "Gaurav Rakade",
				post: "Sports Head",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "gauravrakde77@gmail.com",
				phone: "8767309163",
				social: { linkedin: "#" },
			},
			// Technical Heads
			{
				id: 33,
				name: "Yash Shelke",
				post: "Technical Head",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "yashshelke885@gmail.com",
				phone: "7030502701",
				social: { linkedin: "#" },
			},
			{
				id: 34,
				name: "Priyanshu Raut",
				post: "Technical Head",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "priyanshuraut49@gmail.com",
				phone: "9511959183",
				social: { linkedin: "#" },
			},
			// Sponsorship Heads
			{
				id: 35,
				name: "Janvi Bhaise",
				post: "Sponsorship Head",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "janvibhaise@gmail.com",
				phone: "8530671133",
				social: { linkedin: "#" },
			},
			{
				id: 36,
				name: "Adil Dhote",
				post: "Sponsorship Head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
		],
		members: [
			// Joint-Secretaries
			{
				id: 37,
				name: "Advait Kadoo",
				post: "Joint-Secretary",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "kadooadvait@gmail.com",
				phone: "7499760956",
				social: { linkedin: "#" },
			},
			{
				id: 38,
				name: "Arnav Dafre",
				post: "Joint-Secretary",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "arnavdafre08@gmail.com",
				phone: "8446419915",
				social: { linkedin: "#" },
			},
			{
				id: 39,
				name: "Reva Bhalodia",
				post: "Joint-Secretary",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "revabhalodia19@gmail.com",
				phone: "7820866084",
				social: { linkedin: "#" },
			},
			// Joint-Treasurer
			{
				id: 40,
				name: "Aditya Gour",
				post: "Joint-Treasurer",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			// Event Management Co-Heads & Co-ordinators
			{
				id: 41,
				name: "Kaustubh Sahare",
				post: "Event Management Co-Head",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "kaustubhsahare3@gmail.com",
				phone: "9922138306",
				social: { linkedin: "#" },
			},
			{
				id: 42,
				name: "Tanmay Dhote",
				post: "Event Management Co-Head",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "tanmaydhote2005@gmail.com",
				phone: "8626025914",
				social: { linkedin: "#" },
			},
			{
				id: 43,
				name: "Aniket Ambulkar",
				post: "Event Management Co-ordinator",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "aniketambulkar7860@gmail.com",
				phone: "9373366406",
				social: { linkedin: "#" },
			},
			{
				id: 44,
				name: "Prashik Gaikwad",
				post: "Event Management Co-ordinator",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "prashikgaikwad450@gmail.com",
				phone: "8390278346",
				social: { linkedin: "#" },
			},
			{
				id: 45,
				name: "Ojas Satdeve",
				post: "Event Management Co-ordinator",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "ojassatdeve@gmail.com",
				phone: "9112606716",
				social: { linkedin: "#" },
			},
			// Cultural Co-Heads & Co-ordinators
			{
				id: 46,
				name: "Darshana Taywade",
				post: "Cultural Co-Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "darshanataywade2005@gmail.com",
				phone: "9356328056",
				social: { linkedin: "#" },
			},
			{
				id: 47,
				name: "Tanushree Meshram",
				post: "Cultural Co-Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "meshramtanushree2@gmail.com",
				phone: "9699783992",
				social: { linkedin: "#" },
			},
			{
				id: 48,
				name: "Sana Pophale",
				post: "Cultural Co-ordinator",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "sanapophale@gmail.com",
				phone: "9049749551",
				social: { linkedin: "#" },
			},
			{
				id: 49,
				name: "Madhura Randive",
				post: "Cultural Co-ordinator",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "mrandive1972@gmail.com",
				phone: "8767163462",
				social: { linkedin: "#" },
			},
			{
				id: 50,
				name: "Prajwal Belekar",
				post: "Cultural Co-ordinator",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "theprajwal20@gmail.com",
				phone: "8180025289",
				social: { linkedin: "#" },
			},
			{
				id: 51,
				name: "Chinmay Ashtankar",
				post: "Cultural Co-ordinator",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			// Database Co-Heads
			{
				id: 52,
				name: "Siya Khurana",
				post: "Database Co-Head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "khusransiya1105@gmail.com",
				phone: "8830295720",
				social: { linkedin: "#" },
			},
			{
				id: 53,
				name: "Nandini Joshi",
				post: "Database Co-Head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "nandinijoshi2424@gmail.com",
				phone: "9604671145",
				social: { linkedin: "#" },
			},
			{
				id: 54,
				name: "Abhay Deshmukh",
				post: "Database Co-Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "abhaydeshmukh0001@gmail.com",
				phone: "9325054662",
				social: { linkedin: "#" },
			},
			// Decoration Co-Heads & Co-ordinators
			{
				id: 55,
				name: "Varad Kadam",
				post: "Decoration Co-Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "kadamvarad924@gmail.com",
				phone: "8468815961",
				social: { linkedin: "#" },
			},
			{
				id: 56,
				name: "Yashashree Gabhane",
				post: "Decoration Co-Head",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "yashshreegabhane@gmail.com",
				phone: "9145731074",
				social: { linkedin: "#" },
			},
			{
				id: 57,
				name: "Yash Johri",
				post: "Decoration Co-ordinator",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "yashjohri63@gmail.com",
				phone: "7620359891",
				social: { linkedin: "#" },
			},
			{
				id: 58,
				name: "Gauri Kide",
				post: "Decoration Co-ordinator",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "gaurik8149@gmail.com",
				phone: "8149057011",
				social: { linkedin: "#" },
			},
			{
				id: 59,
				name: "Shruti Kayande",
				post: "Decoration Co-ordinator",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "kayandeshruti@gmail.com",
				phone: "7276321887",
				social: { linkedin: "#" },
			},
			{
				id: 60,
				name: "Pritha Kakad",
				post: "Decoration Co-ordinator",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "prithakakad02@gmail.com",
				phone: "7030378819",
				social: { linkedin: "#" },
			},
			{
				id: 61,
				name: "Sejal Gabhane",
				post: "Decoration Co-ordinator",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "sggabhane11@gmail.com",
				phone: "8446014518",
				social: { linkedin: "#" },
			},
			// Design Co-Heads & Co-ordinators
			{
				id: 62,
				name: "Samyak Umathe",
				post: "Design Co-Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 63,
				name: "Priyanshu Kayarkar",
				post: "Design Co-Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "priyanshukayarkar8@gmail.com",
				phone: "7559425066",
				social: { linkedin: "#" },
			},
			{
				id: 64,
				name: "Nishant Kohad",
				post: "Design Co-ordinator",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "nishantkohad29@gmail.com",
				phone: "8446320662",
				social: { linkedin: "#" },
			},
			{
				id: 65,
				name: "Vaishnavi Tangade",
				post: "Design Co-ordinator",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 66,
				name: "Samiksha Pachpor",
				post: "Design Co-ordinator",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "samikshavpachpor@gmail.com",
				phone: "8408831113",
				social: { linkedin: "#" },
			},
			// Publicity Co-Heads
			{
				id: 67,
				name: "Pranav Jagtap",
				post: "Publicity Co-Head",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "pranavjagtap092@gmail.com",
				phone: "8668232506",
				social: { linkedin: "#" },
			},
			{
				id: 68,
				name: "Aryan Saharkar",
				post: "Publicity Co-Head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "saharkararyan@gmail.com",
				phone: "9834822574",
				social: { linkedin: "#" },
			},
			// Technical Co-heads
			{
				id: 69,
				name: "Om Kuthe",
				post: "Technical Co-head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "omkuthe10@gmail.com",
				phone: "9604448400",
				social: { linkedin: "#" },
			},
			{
				id: 70,
				name: "Chirayu Patle",
				post: "Technical Co-head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 71,
				name: "Aditya Gumgaonkar",
				post: "Technical Co-head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "aditya.gumgaonkar9021@gmail.com",
				phone: "9518701292",
				social: { linkedin: "#" },
			},
			// Sports Co-heads & Co-ordinators
			{
				id: 72,
				name: "Akshat Vyawahare",
				post: "Sports Co-head",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "akshatvyawahare12@gmail.com",
				phone: "7972392006",
				social: { linkedin: "#" },
			},
			{
				id: 73,
				name: "Parth Gomase",
				post: "Sports Co-head",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "parthgomase10@gmail.com",
				phone: "8767312008",
				social: { linkedin: "#" },
			},
			{
				id: 74,
				name: "Tanshiq Borekar",
				post: "Sports Co-ordinator",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 75,
				name: "Shivam Javarkar",
				post: "Sports Co-ordinator",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "shivamjawarkar18@gmail.com",
				phone: "7720066417",
				social: { linkedin: "#" },
			},
			// Photography & Videography Co-heads
			{
				id: 76,
				name: "Aditya Gupta",
				post: "Photography & Videography Co-head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "adityasatishgupta2004@gmail.com",
				phone: "9399593041",
				social: { linkedin: "#" },
			},
			{
				id: 77,
				name: "Jay Sangole",
				post: "Photography & Videography Co-head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 78,
				name: "Vaibhav Meshram",
				post: "Photography & Videography Co-head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "vaibhavmeshram411@gmail.com",
				phone: "9371403532",
				social: { linkedin: "#" },
			},
			// Social Media Co-heads
			{
				id: 79,
				name: "Anushka Bhujade",
				post: "Social Media Co-head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "anushkabhujadep6@gmail.com",
				phone: "7776038868",
				social: { linkedin: "#" },
			},
			{
				id: 80,
				name: "Chetan Rewatkar",
				post: "Social Media Co-head",
				pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "chetanrewatkar121@gmail.com",
				phone: "8261053882",
				social: { linkedin: "#" },
			},
			// Literature Co-heads
			{
				id: 81,
				name: "Isha Sawarkar",
				post: "Literature Co-head",
				pic: "https://images.unsplash.com/photo-1549448074-2900c73229b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "ishasawarkar3113@gmail.com",
				phone: "8446267629",
				social: { linkedin: "#" },
			},
			{
				id: 82,
				name: "Tejasvi Jadhao",
				post: "Literature Co-head",
				pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "tejasvijadhao@gmail.com",
				phone: "9403315952",
				social: { linkedin: "#" },
			},
			{
				id: 83,
				name: "Gargi Deshpande",
				post: "Literature Co-head",
				pic: "https://images.unsplash.com/photo-1552058544-a028084122d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "gargid020405@gmail.com",
				phone: "7719079248",
				social: { linkedin: "#" },
			},
			// Sponsorship Co-Heads
			{
				id: 84,
				name: "Avaneesh Bodhe",
				post: "Sponsorship Co-Head",
				pic: "https://images.unsplash.com/photo-1579783483458-753d9e837f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				// No email or phone
				social: { linkedin: "#" },
			},
			{
				id: 85,
				name: "Pratham Chavhan",
				post: "Sponsorship Co-Head",
				pic: "https://images.unsplash.com/photo-1519085360753-af0f389a9ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "prathamchavhan3377@gmail.com",
				phone: "9284980652",
				social: { linkedin: "#" },
			},
			{
				id: 86,
				name: "Yash Umbarkar",
				post: "Sponsorship Co-Head",
				pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "yashumbarkar017@gmail.com",
				phone: "8767417351",
				social: { linkedin: "#" },
			},
			{
				id: 87,
				name: "Tilak Rathi",
				post: "Sponsorship Co-Head",
				pic: "https://images.unsplash.com/photo-1581456495147-380d750c1822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
				email: "iamtilakrathi16@gmail.com",
				phone: "8830998981",
				social: { linkedin: "#" },
			},
		],
	};

	const tabs = [
		{
			id: "core",
			name: "Core Committee",
			icon: Crown,
			color: "#8B5CF6",
			glow: "rgba(139, 92, 246, 0.3)",
		},
		{
			id: "heads",
			name: "Heads",
			icon: Users,
			color: "#EF4444",
			glow: "rgba(239, 68, 68, 0.3)",
		},
		{
			id: "members",
			name: "Co-Heads & Co-ordinators",
			icon: Users,
			color: "#10B981",
			glow: "rgba(16, 185, 129, 0.3)",
		},
	];
    
const Team = () => {
	const [activeTab, setActiveTab] = useState("core");

	const simplifiedMemberCard = (member, index, activeTab) => (
		<motion.div
			key={member.id}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
			}}
			whileHover={{
				y: -10,
				boxShadow: `0 10px 20px ${tabs.find((t) => t.id === activeTab)?.glow}`,
			}}
			className="group cursor-pointer"
		>
			<div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-3xl text-center overflow-hidden transition-all duration-300">
				{/* Avatar */}
				<div className="relative mb-6">
					<div className="w-28 h-28 mx-auto rounded-full overflow-hidden relative border-2 border-gray-700 group-hover:border-purple-500 transition-colors duration-300">
						<img
							src={member.pic}
							alt={member.name}
							className={`w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-110`}
						/>
					</div>
				</div>

				{/* Member Info */}
				<h3 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-purple-500">
					{member.name}
				</h3>

				<p className="text-gray-400 font-medium mb-4 text-sm">{member.post}</p>

				{/* Contact Info (simplified) */}
				<div className="space-y-3 text-sm text-gray-500 mb-6">
					{member.email && (
						<div className="flex items-center justify-center gap-2 group-hover:text-gray-300 transition-colors">
							<Mail size={14} className="text-purple-500" />
							<span>{member.email}</span>
						</div>
					)}
					{member.phone && (
						<div className="flex items-center justify-center gap-2 group-hover:text-gray-300 transition-colors">
							<Phone size={14} className="text-purple-500" />
							<span>{member.phone}</span>
						</div>
					)}
				</div>

				{/* Social Links */}
				{/* <div className="flex justify-center gap-4">
                    {member.social?.linkedin && (
                        <a
                            href={member.social.linkedin}
                            className="text-gray-600 hover:text-purple-500 transition-all duration-300"
                        >
                            <Linkedin size={20} />
                        </a>
                    )}
                </div> */}
			</div>
		</motion.div>
	);

	return (
		<div className="min-h-screen pt-20 bg-black text-white relative overflow-hidden">
			<Spider/>
			{/* Header */}
			<section className="py-20 text-center px-4">
				<motion.h1
					className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"
					initial={{ opacity: 0, y: -50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					MEET THE{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
						COVEN
					</span>
				</motion.h1>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.8 }}
					className="max-w-4xl mx-auto px-4"
				>
					<p className="text-xl md:text-2xl text-gray-300 mb-4">
						Meet the team behind the success
					</p>
					<div className="flex justify-center items-center gap-4 text-sm text-gray-500">
						<span className="flex items-center gap-2">
							<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
							{Object.values(teamData).flat().length} Team Members
						</span>
					</div>
				</motion.div>
			</section>

			{/* Team Navigation */}
			<section className="py-10 relative z-10">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-6 mb-16">
						{tabs.map((tab) => {
							const IconComponent = tab.icon;
							return (
								<motion.button
									key={tab.id}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setActiveTab(tab.id)}
									className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border ${
										activeTab === tab.id
											? `bg-gray-800 border-purple-500 text-white shadow-lg`
											: "bg-gray-900/30 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
									}`}
								>
									<IconComponent
										size={20}
										className={
											activeTab === tab.id ? "text-purple-500" : "text-gray-500"
										}
									/>
									<span>{tab.name}</span>
								</motion.button>
							);
						})}
					</div>

					{/* Team Grid */}
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.4 }}
							className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
						>
							{teamData[activeTab].map((member, index) =>
								simplifiedMemberCard(member, index, activeTab)
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</section>
		</div>
	);
};

export default Team;
