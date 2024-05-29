export module Api {
  export namespace General {
    export interface Post {
      id: string;
      name: string;
      data?: Record<string, string>;
    }
  }

  export namespace Posts {
    export namespace FetchAllPosts {
      export type Response = General.Post[];
    }

    export namespace FetchSinglePost {
      export interface Request {
        id: string;
      }

      export type Response = General.Post;
    }

    export namespace EditPost {
      export interface Request {
        id: string;
        data: Omit<General.Post, "id">;
      }

      export interface Response extends General.Post {
        updatedAt: string;
      }
    }

    export namespace DeletePost {
      export interface Request {
        id: string;
      }

      export interface Response {
        message: string;
      }
    }
  }
}
