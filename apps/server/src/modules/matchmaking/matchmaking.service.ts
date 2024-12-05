import { Injectable, BadRequestException } from "@nestjs/common";
import { Matchmaking } from "../../schemas/matchmaking.schema";
import { Ensemble } from "../../schemas/ensemble.schema";
import { Types } from "mongoose";

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable()
export class MatchmakingService {
  async getRecommendations(coordinates: Coordinates, radius = 50, limit = 10) {
    const { latitude, longitude } = coordinates;

    const ensembles = await Ensemble.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "distance",
          maxDistance: radius * 1000,
          spherical: true,
        },
      },
      { $match: { is_active: true } },
      { $limit: limit },
    ]);

    return ensembles;
  }

  async createMatch(userId: string, ensembleId: string, liked: boolean) {
    if (!Types.ObjectId.isValid(ensembleId)) {
      throw new BadRequestException("Invalid ensemble ID");
    }

    const match = new Matchmaking({
      user: new Types.ObjectId(userId),
      ensemble: new Types.ObjectId(ensembleId),
      liked,
      status: liked ? "new" : "rejected",
    });

    await match.save();
    return match;
  }
}