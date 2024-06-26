"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targerUserId: string, isLiked: boolean) {
	try {
		const userId = await getAuthUserId();

		if (isLiked) {
			await prisma.like.delete({
				where: {
					sourceUserId_targerUserId: {
						sourceUserId: userId,
						targerUserId,
					},
				},
			});
		} else {
			await prisma.like.create({
				data: {
					sourceUserId: userId,
					targerUserId,
				},
			});
		}
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export async function fetchCurrentUserLikeIds() {
	try {
		const userId = await getAuthUserId();
		const likeIds = await prisma.like.findMany({
			where: {
				sourceUserId: userId,
			},
			select: {
				targerUserId: true,
			},
		});
		return likeIds.map((like) => like.targerUserId);
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export async function fetchLikedMembers(type = "source") {
	try {
		const userId = await getAuthUserId();
		switch (type) {
			case "source":
				return await fetchSourceLikes(userId);
			case "targer":
				return await fetchTargetLikes(userId);
			case "mutual":
				return await fetchMutualLikes(userId);
			default:
				return [];
		}
	} catch (err) {
		console.log(err);
		throw err;
	}
}
async function fetchSourceLikes(userId: string) {
	const sourceList = await prisma.like.findMany({
		where: { sourceUserId: userId },
		select: { targetMember: true },
	});
	return sourceList.map((x) => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
	const targetList = await prisma.like.findMany({
		where: { targerUserId: userId },
		select: { sourceMember: true },
	});
	return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
	const likedUsers = await prisma.like.findMany({
		where: { sourceUserId: userId },
		select: { targerUserId: true },
	});
	const likedIds = likedUsers.map((x) => x.targerUserId);

	const mutualList = await prisma.like.findMany({
		where: {
			AND: [{ targerUserId: userId }, { sourceUserId: { in: likedIds } }],
		},
		select: { sourceMember: true },
	});
	return mutualList.map((x) => x.sourceMember);
}
