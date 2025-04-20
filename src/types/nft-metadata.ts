
export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFTFileMetadata {
  uri: string;
  type: string;
}

export interface NFTCreator {
  address: string;
  share: number;
}

export interface TicketData {
  event_id: string;
  ticket_id: string;
  qr_verification_url: string;
  resale_status: string;
  original_price: number;
}

export interface NFTProperties {
  files: NFTFileMetadata[];
  category: string;
  creators: NFTCreator[];
  ticket_data?: TicketData;
}

export interface TicketNFTMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  external_url: string;
  attributes: NFTAttribute[];
  properties: NFTProperties;
}

export function generateTicketNFTMetadata(
  eventName: string,
  eventDate: string,
  venueName: string,
  section: string,
  row: string,
  seat: string,
  eventId: string,
  ticketId: string,
  creatorAddress: string,
  imageUrl: string = "https://via.placeholder.com/350x150/14F195/000000?text=TICKET", // Fallback image
  originalPrice: number = 100000000 // in lamports
): TicketNFTMetadata {
  return {
    name: `${eventName} - Seat ${section}${row}${seat}`,
    symbol: "TCKT",
    description: `Official ticket for ${eventName} on ${eventDate}`,
    seller_fee_basis_points: 500, // 5% resale royalty
    image: imageUrl,
    external_url: `https://blocktix.app/tickets/${ticketId}`,
    attributes: [
      {
        trait_type: "Event",
        value: eventName
      },
      {
        trait_type: "Date",
        value: eventDate
      },
      {
        trait_type: "Venue",
        value: venueName
      },
      {
        trait_type: "Section",
        value: section
      },
      {
        trait_type: "Row",
        value: row
      },
      {
        trait_type: "Seat",
        value: seat
      },
      {
        trait_type: "Status",
        value: "Active"
      }
    ],
    properties: {
      files: [
        {
          uri: imageUrl,
          type: "image/png"
        }
      ],
      category: "ticket",
      creators: [
        {
          address: creatorAddress,
          share: 100
        }
      ],
      ticket_data: {
        event_id: eventId,
        ticket_id: ticketId,
        qr_verification_url: `https://blocktix.app/verify/${ticketId}`,
        resale_status: "not_listed",
        original_price: originalPrice
      }
    }
  };
}
