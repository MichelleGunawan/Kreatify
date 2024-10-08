export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agency: {
        Row: {
          address: string | null
          agency_commission: number | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          date_founded: string | null
          email: string | null
          id: string
          influencer_commission: number | null
          manager_commission: number | null
          name: string | null
          owner_email: string | null
          payment_options: Database["public"]["Enums"]["payment_type"][]
          phone: string | null
          state: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          agency_commission?: number | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          date_founded?: string | null
          email?: string | null
          id?: string
          influencer_commission?: number | null
          manager_commission?: number | null
          name?: string | null
          owner_email?: string | null
          payment_options: Database["public"]["Enums"]["payment_type"][]
          phone?: string | null
          state?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          agency_commission?: number | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          date_founded?: string | null
          email?: string | null
          id?: string
          influencer_commission?: number | null
          manager_commission?: number | null
          name?: string | null
          owner_email?: string | null
          payment_options?: Database["public"]["Enums"]["payment_type"][]
          phone?: string | null
          state?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      campaign: {
        Row: {
          agency_id: string | null
          brand: string | null
          brand_contact_id: number | null
          brand_link: string | null
          campaign_manager: string | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          contract_url: string | null
          created_at: string | null
          date_accepted_rejected: string | null
          date_closed: string | null
          exclusivity: string | null
          id: string
          influencer: string | null
          name: string
          other_assignees: string[] | null
          partnership_type:
            | Database["public"]["Enums"]["partnership_type"]
            | null
          status: Database["public"]["Enums"]["campaign_status"]
          talent_manager: string | null
          usage: string | null
        }
        Insert: {
          agency_id?: string | null
          brand?: string | null
          brand_contact_id?: number | null
          brand_link?: string | null
          campaign_manager?: string | null
          category?: Database["public"]["Enums"]["campaign_category"] | null
          contract_url?: string | null
          created_at?: string | null
          date_accepted_rejected?: string | null
          date_closed?: string | null
          exclusivity?: string | null
          id?: string
          influencer?: string | null
          name: string
          other_assignees?: string[] | null
          partnership_type?:
            | Database["public"]["Enums"]["partnership_type"]
            | null
          status?: Database["public"]["Enums"]["campaign_status"]
          talent_manager?: string | null
          usage?: string | null
        }
        Update: {
          agency_id?: string | null
          brand?: string | null
          brand_contact_id?: number | null
          brand_link?: string | null
          campaign_manager?: string | null
          category?: Database["public"]["Enums"]["campaign_category"] | null
          contract_url?: string | null
          created_at?: string | null
          date_accepted_rejected?: string | null
          date_closed?: string | null
          exclusivity?: string | null
          id?: string
          influencer?: string | null
          name?: string
          other_assignees?: string[] | null
          partnership_type?:
            | Database["public"]["Enums"]["partnership_type"]
            | null
          status?: Database["public"]["Enums"]["campaign_status"]
          talent_manager?: string | null
          usage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_brand_contact_id_fkey"
            columns: ["brand_contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_brand_contact_id_fkey"
            columns: ["brand_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts_table_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_brand_contact_id_fkey"
            columns: ["brand_contact_id"]
            isOneToOne: false
            referencedRelation: "my_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_matching_answer: {
        Row: {
          answer: string | null
          created_at: string
          id: number
          influencer_id: string | null
          question_id: number | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: number
          influencer_id?: string | null
          question_id?: number | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: number
          influencer_id?: string | null
          question_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "campaign_matching_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_matching_questions: {
        Row: {
          agency_id: string | null
          created_at: string
          id: number
          options: string[] | null
          question: string | null
          type: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          id?: number
          options?: string[] | null
          question?: string | null
          type?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          id?: number
          options?: string[] | null
          question?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      campaign_payment: {
        Row: {
          agency_id: string | null
          agency_paid_date: string | null
          agency_percentage: number | null
          amount: number | null
          campaign_id: string | null
          completion_date: string | null
          id: number
          influencer_paid_date: string | null
          influencer_percentage: number | null
          manager_paid_date: string | null
          manager_percentage: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
        }
        Insert: {
          agency_id?: string | null
          agency_paid_date?: string | null
          agency_percentage?: number | null
          amount?: number | null
          campaign_id?: string | null
          completion_date?: string | null
          id?: never
          influencer_paid_date?: string | null
          influencer_percentage?: number | null
          manager_paid_date?: string | null
          manager_percentage?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Update: {
          agency_id?: string | null
          agency_paid_date?: string | null
          agency_percentage?: number | null
          amount?: number | null
          campaign_id?: string | null
          completion_date?: string | null
          id?: never
          influencer_paid_date?: string | null
          influencer_percentage?: number | null
          manager_paid_date?: string | null
          manager_percentage?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_payment_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_payment_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_payment_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_completed_header"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_edit_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_payment_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_rejected_campaigns_view"
            referencedColumns: ["id"]
          },
        ]
      }
      contact: {
        Row: {
          agency_id: string | null
          brand: string
          email: string
          id: number
          manager_id: string
          name: string
          position: string
          type: Database["public"]["Enums"]["contact_type"]
        }
        Insert: {
          agency_id?: string | null
          brand: string
          email: string
          id?: never
          manager_id: string
          name: string
          position: string
          type: Database["public"]["Enums"]["contact_type"]
        }
        Update: {
          agency_id?: string | null
          brand?: string
          email?: string
          id?: never
          manager_id?: string
          name?: string
          position?: string
          type?: Database["public"]["Enums"]["contact_type"]
        }
        Relationships: [
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverable: {
        Row: {
          attachments: string[] | null
          campaign_id: string | null
          id: number
          note: string | null
          order: number | null
        }
        Insert: {
          attachments?: string[] | null
          campaign_id?: string | null
          id?: never
          note?: string | null
          order?: number | null
        }
        Update: {
          attachments?: string[] | null
          campaign_id?: string | null
          id?: never
          note?: string | null
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_completed_header"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_edit_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_rejected_campaigns_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer: {
        Row: {
          bio: string | null
          effective_date: string | null
          id: string
          niches: string[] | null
          notes: string | null
          role: Database["public"]["Enums"]["influencer_type"] | null
          signed_contract_url: string | null
          user_id: string | null
          w8_form_url: string | null
        }
        Insert: {
          bio?: string | null
          effective_date?: string | null
          id?: string
          niches?: string[] | null
          notes?: string | null
          role?: Database["public"]["Enums"]["influencer_type"] | null
          signed_contract_url?: string | null
          user_id?: string | null
          w8_form_url?: string | null
        }
        Update: {
          bio?: string | null
          effective_date?: string | null
          id?: string
          niches?: string[] | null
          notes?: string | null
          role?: Database["public"]["Enums"]["influencer_type"] | null
          signed_contract_url?: string | null
          user_id?: string | null
          w8_form_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_auth_details"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "influencer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      influencer_agency_relation: {
        Row: {
          agency_id: string
          created_at: string
          id: string
          influencer_id: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          id?: string
          influencer_id?: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          id?: string
          influencer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_manager_relation: {
        Row: {
          created_at: string
          id: number
          influencer_id: string | null
          manager_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          influencer_id?: string | null
          manager_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          influencer_id?: string | null
          manager_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_payment_info: {
        Row: {
          acct_holder_name: string | null
          acct_number: number | null
          bank_name: string | null
          email: string | null
          id: number
          influencer_id: string
          phone: string | null
          routing_number: number | null
          swift_code: number | null
          type: Database["public"]["Enums"]["payment_type"]
        }
        Insert: {
          acct_holder_name?: string | null
          acct_number?: number | null
          bank_name?: string | null
          email?: string | null
          id?: number
          influencer_id?: string
          phone?: string | null
          routing_number?: number | null
          swift_code?: number | null
          type: Database["public"]["Enums"]["payment_type"]
        }
        Update: {
          acct_holder_name?: string | null
          acct_number?: number | null
          bank_name?: string | null
          email?: string | null
          id?: number
          influencer_id?: string
          phone?: string | null
          routing_number?: number | null
          swift_code?: number | null
          type?: Database["public"]["Enums"]["payment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_payment_info_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      manager: {
        Row: {
          agency_id: string | null
          id: string
          role: Database["public"]["Enums"]["manager_type"]
          signed_contract_url: string | null
          user_id: string | null
        }
        Insert: {
          agency_id?: string | null
          id?: string
          role: Database["public"]["Enums"]["manager_type"]
          signed_contract_url?: string | null
          user_id?: string | null
        }
        Update: {
          agency_id?: string | null
          id?: string
          role?: Database["public"]["Enums"]["manager_type"]
          signed_contract_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_auth_details"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "manager_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
      milestone: {
        Row: {
          campaign_id: string | null
          deliverable_id: number | null
          due_date: string | null
          id: number
          social_id: string | null
          status: Database["public"]["Enums"]["milestone_status_type"] | null
          type: Database["public"]["Enums"]["task_type"] | null
        }
        Insert: {
          campaign_id?: string | null
          deliverable_id?: number | null
          due_date?: string | null
          id?: never
          social_id?: string | null
          status?: Database["public"]["Enums"]["milestone_status_type"] | null
          type?: Database["public"]["Enums"]["task_type"] | null
        }
        Update: {
          campaign_id?: string | null
          deliverable_id?: number | null
          due_date?: string | null
          id?: never
          social_id?: string | null
          status?: Database["public"]["Enums"]["milestone_status_type"] | null
          type?: Database["public"]["Enums"]["task_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_completed_header"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_edit_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_rejected_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "campaign_deliverables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverable"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestone_social_id_fkey"
            columns: ["social_id"]
            isOneToOne: false
            referencedRelation: "social"
            referencedColumns: ["id"]
          },
        ]
      }
      milestone_note: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          milestone_id: number | null
          note: string | null
          seen: boolean | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          milestone_id?: number | null
          note?: string | null
          seen?: boolean | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          milestone_id?: number | null
          note?: string | null
          seen?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "milestone_notes_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestone"
            referencedColumns: ["id"]
          },
        ]
      }
      milestone_submission: {
        Row: {
          created_at: string
          description: string | null
          id: number
          milestone_id: number | null
          submission: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          milestone_id?: number | null
          submission?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          milestone_id?: number | null
          submission?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestone_submission_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestone"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          body_text: string | null
          created_at: string
          header_text: string | null
          id: number
          influencer_recipient_id: string | null
          manager_recipient_id: string | null
          routing: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          body_text?: string | null
          created_at?: string
          header_text?: string | null
          id?: number
          influencer_recipient_id?: string | null
          manager_recipient_id?: string | null
          routing?: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          body_text?: string | null
          created_at?: string
          header_text?: string | null
          id?: number
          influencer_recipient_id?: string | null
          manager_recipient_id?: string | null
          routing?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "notification_influencer_recipient_id_fkey"
            columns: ["influencer_recipient_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_manager_recipient_id_fkey"
            columns: ["manager_recipient_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_manager_recipient_id_fkey"
            columns: ["manager_recipient_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "notification_manager_recipient_id_fkey"
            columns: ["manager_recipient_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_manager_recipient_id_fkey"
            columns: ["manager_recipient_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      onboard_invite: {
        Row: {
          agency_id: string
          contract_url: string | null
          created_at: string
          email: string
          id: string
          user_role: string
          user_type: string
        }
        Insert: {
          agency_id: string
          contract_url?: string | null
          created_at?: string
          email: string
          id?: string
          user_role: string
          user_type: string
        }
        Update: {
          agency_id?: string
          contract_url?: string | null
          created_at?: string
          email?: string
          id?: string
          user_role?: string
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboard_invite_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboard_invite_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboard_invite_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "onboard_invite_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "onboard_invite_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      pitchlist: {
        Row: {
          agency_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "pitchlist_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      pitchlist_influencer_relation: {
        Row: {
          id: string
          influencer_id: string | null
          influencer_rate: number | null
          pitchlist_id: string | null
        }
        Insert: {
          id?: string
          influencer_id?: string | null
          influencer_rate?: number | null
          pitchlist_id?: string | null
        }
        Update: {
          id?: string
          influencer_id?: string | null
          influencer_rate?: number | null
          pitchlist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_relation_pitchlist_id_fkey"
            columns: ["pitchlist_id"]
            isOneToOne: false
            referencedRelation: "pitchlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_relation_pitchlist_id_fkey"
            columns: ["pitchlist_id"]
            isOneToOne: false
            referencedRelation: "pitchlist_contact_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_relation_pitchlist_id_fkey"
            columns: ["pitchlist_id"]
            isOneToOne: false
            referencedRelation: "pitchlist_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_relation_pitchlist_id_fkey"
            columns: ["pitchlist_id"]
            isOneToOne: false
            referencedRelation: "pitchlist_users_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_influencer_relation_pitchlist_id_fkey"
            columns: ["pitchlist_id"]
            isOneToOne: false
            referencedRelation: "pitchlists_view"
            referencedColumns: ["id"]
          },
        ]
      }
      result: {
        Row: {
          max: string | null
        }
        Insert: {
          max?: string | null
        }
        Update: {
          max?: string | null
        }
        Relationships: []
      }
      social: {
        Row: {
          followers: number | null
          handle: string | null
          id: string
          influencer_id: string
          platform: Database["public"]["Enums"]["social_platforms"] | null
        }
        Insert: {
          followers?: number | null
          handle?: string | null
          id?: string
          influencer_id: string
          platform?: Database["public"]["Enums"]["social_platforms"] | null
        }
        Update: {
          followers?: number | null
          handle?: string | null
          id?: string
          influencer_id?: string
          platform?: Database["public"]["Enums"]["social_platforms"] | null
        }
        Relationships: [
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "social_profile_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          address: string | null
          avatar_url: string | null
          birth_date: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          ethnicity: string[] | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          permission: Database["public"]["Enums"]["permission_types"] | null
          phone: string | null
          sexuality: string | null
          state: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          ethnicity?: string[] | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          permission?: Database["public"]["Enums"]["permission_types"] | null
          phone?: string | null
          sexuality?: string | null
          state?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          ethnicity?: string[] | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          permission?: Database["public"]["Enums"]["permission_types"] | null
          phone?: string | null
          sexuality?: string | null
          state?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      user_agency_relation: {
        Row: {
          agency_id: string | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_auth_details"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_basic_info_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_agency_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_view"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      agency_campaign_matching_questions_view: {
        Row: {
          agency_id: string | null
          campaign_matching_questions: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_matching_questions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      agency_influencers_with_socials_view: {
        Row: {
          agency_id: string | null
          id: string | null
          name: string | null
          niches: string[] | null
          profile_image: string | null
          social_following: Json | null
          user_id: string | null
          user_role: Database["public"]["Enums"]["influencer_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      agency_logo_view: {
        Row: {
          agency_logo: string | null
          agency_name: string | null
          agency_website: string | null
          id: string | null
        }
        Insert: {
          agency_logo?: string | null
          agency_name?: string | null
          agency_website?: string | null
          id?: string | null
        }
        Update: {
          agency_logo?: string | null
          agency_name?: string | null
          agency_website?: string | null
          id?: string | null
        }
        Relationships: []
      }
      agency_managers_team_view: {
        Row: {
          agency_id: string | null
          contact_info: Json | null
          id: string | null
          num_campaigns_created: number | null
          num_campaigns_managed: number | null
          role: Database["public"]["Enums"]["manager_type"] | null
          total_value_campaigns_created: number | null
          total_value_campaigns_managed: number | null
          user: Json | null
        }
        Relationships: []
      }
      campaign_completed_header: {
        Row: {
          brand_contact: Json | null
          id: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
        }
        Relationships: []
      }
      campaign_deliverables_view: {
        Row: {
          attachments: string[] | null
          campaign_id: string | null
          id: number | null
          milestones: Json | null
          note: string | null
          order: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_completed_header"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_edit_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "influencer_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_campaign_page_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_completed_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_ongoing_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_pending_campaigns_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliverable_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "manager_rejected_campaigns_view"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_edit_info_view: {
        Row: {
          agency_commission: number | null
          brand_contact_id: number | null
          brand_link: string | null
          brand_name: string | null
          campaign_manager_id: string | null
          campaign_name: string | null
          campaign_rate: number | null
          campaign_status: string | null
          category: string | null
          contract: string | null
          exclusivity: string | null
          id: string | null
          influencer_commission: number | null
          influencer_id: string | null
          manager_commission: number | null
          partnership_type: string | null
          usage: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_brand_contact_id_fkey"
            columns: ["brand_contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_brand_contact_id_fkey"
            columns: ["brand_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts_table_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_brand_contact_id_fkey"
            columns: ["brand_contact_id"]
            isOneToOne: false
            referencedRelation: "my_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts_table_view: {
        Row: {
          agency_id: string | null
          avg_partnership_value: number | null
          brand: string | null
          contact_info: Json | null
          id: number | null
          last_partnership_date: string | null
          manager_id: string | null
          name: string | null
          niches: string[] | null
          num_of_partnerships: number | null
          position: string | null
          type: Database["public"]["Enums"]["contact_type"] | null
        }
        Insert: {
          agency_id?: string | null
          avg_partnership_value?: never
          brand?: string | null
          contact_info?: never
          id?: number | null
          last_partnership_date?: never
          manager_id?: string | null
          name?: string | null
          niches?: never
          num_of_partnerships?: never
          position?: string | null
          type?: Database["public"]["Enums"]["contact_type"] | null
        }
        Update: {
          agency_id?: string | null
          avg_partnership_value?: never
          brand?: string | null
          contact_info?: never
          id?: number | null
          last_partnership_date?: never
          manager_id?: string | null
          name?: string | null
          niches?: never
          num_of_partnerships?: never
          position?: string | null
          type?: Database["public"]["Enums"]["contact_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_agency_info_view: {
        Row: {
          agency_address: string | null
          agency_bio: string | null
          agency_city: string | null
          agency_country: string | null
          agency_date_founded: string | null
          agency_email: string | null
          agency_id: string | null
          agency_logo: string | null
          agency_name: string | null
          agency_payment_options:
            | Database["public"]["Enums"]["payment_type"][]
            | null
          agency_phone: string | null
          agency_state: string | null
          agency_website: string | null
          influencer_id: string | null
          manager_count: number | null
          talent_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_agency_relation_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_basic_info_view: {
        Row: {
          birth_date: string | null
          email: string | null
          ethnicity: string[] | null
          gender: string | null
          id: string | null
          manager: string | null
          notes: string | null
          phone: string | null
          role: string | null
          sexuality: string | null
          user_id: string | null
        }
        Relationships: []
      }
      influencer_campaign_matching_answers_view: {
        Row: {
          answer: string | null
          id: number | null
          influencer_id: string | null
          options: string[] | null
          question_id: number | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_matching_answer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "campaign_matching_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_campaign_matching_questions_view: {
        Row: {
          campaign_matching_questions: Json | null
          influencer_id: string | null
        }
        Relationships: []
      }
      influencer_campaign_page_info_view: {
        Row: {
          brand: Json | null
          campaign_manager: Json | null
          campaign_name: string | null
          campaign_status: Database["public"]["Enums"]["campaign_status"] | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          exclusivity: string | null
          id: string | null
          influencer: Json | null
          partnership_type: string | null
          payout: number | null
          talent_manager: Json | null
          usage: string | null
        }
        Relationships: []
      }
      influencer_completed_campaigns_view: {
        Row: {
          brand: Json | null
          campaign_manager: Json | null
          campaign_name: string | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          id: string | null
          influencer: Json | null
          influencer_id: string | null
          influencer_rate: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          platforms: Json | null
          talent_manager: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_info_view: {
        Row: {
          bio: string | null
          id: string | null
          location: string | null
          niches: string[] | null
          profile_image: string | null
          social_following: Json | null
        }
        Relationships: []
      }
      influencer_ongoing_campaigns_view: {
        Row: {
          brand: Json | null
          campaign_manager: Json | null
          campaign_name: string | null
          campaign_progress: number | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          id: string | null
          influencer: Json | null
          influencer_id: string | null
          next_milestone: string | null
          next_milestone_type: string | null
          platforms: Json | null
          talent_manager: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_pending_campaigns_view: {
        Row: {
          brand: Json | null
          campaign_manager: Json | null
          campaign_name: string | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          confirm_by: string | null
          id: string | null
          influencer: Json | null
          influencer_id: string | null
          influencer_rate: number | null
          platforms: Json | null
          talent_manager: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "campaign_influencer_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_profile_view: {
        Row: {
          agency_id: string | null
          bio: string | null
          city: string | null
          id: string | null
          manager_name: string | null
          manager_profile_image: string | null
          name: string | null
          niches: string[] | null
          profile_image: string | null
          social_following: Json | null
          state: string | null
        }
        Relationships: []
      }
      influencer_team_previews: {
        Row: {
          influencer_id: string | null
          managers: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "agency_influencers_with_socials_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_campaign_matching_questions_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_team_view"
            referencedColumns: ["influencer_id"]
          },
          {
            foreignKeyName: "influencer_manager_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "manager_talent_view"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_team_view: {
        Row: {
          agency: Json | null
          contact_info: Json | null
          influencer_id: string | null
          role: Database["public"]["Enums"]["manager_type"] | null
          user: Json | null
        }
        Relationships: []
      }
      manager_agency_info_view: {
        Row: {
          agency_address: string | null
          agency_bio: string | null
          agency_city: string | null
          agency_country: string | null
          agency_date_founded: string | null
          agency_email: string | null
          agency_id: string | null
          agency_logo: string | null
          agency_name: string | null
          agency_payment_options:
            | Database["public"]["Enums"]["payment_type"][]
            | null
          agency_phone: string | null
          agency_state: string | null
          agency_website: string | null
          manager_count: number | null
          manager_id: string | null
          talent_count: number | null
        }
        Relationships: []
      }
      manager_basic_info_view: {
        Row: {
          birth_date: string | null
          email: string | null
          ethnicity: string[] | null
          gender: string | null
          id: string | null
          managing: number | null
          phone: string | null
          role: string | null
          sexuality: string | null
          user_id: string | null
        }
        Relationships: []
      }
      manager_campaign_page_info_view: {
        Row: {
          agency_id: string | null
          brand: Json | null
          campaign_manager: Json | null
          campaign_name: string | null
          campaign_status: Database["public"]["Enums"]["campaign_status"] | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          exclusivity: string | null
          id: string | null
          influencer: Json | null
          partnership_type: string | null
          payout: number | null
          talent_manager: Json | null
          usage: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      manager_completed_campaigns_view: {
        Row: {
          agency_id: string | null
          brand: Json | null
          campaign_manager: Json | null
          campaign_manager_id: string | null
          campaign_name: string | null
          campaign_rate: number | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          confirm_by: string | null
          id: string | null
          influencer: Json | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          talent_manager: Json | null
          talent_manager_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_ongoing_campaigns_view: {
        Row: {
          agency_id: string | null
          brand: Json | null
          campaign_manager: Json | null
          campaign_manager_id: string | null
          campaign_name: string | null
          campaign_progress: number | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          id: string | null
          influencer: Json | null
          influencer_rate: number | null
          next_milestone: string | null
          next_milestone_type: string | null
          talent_manager: Json | null
          talent_manager_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_pending_campaigns_view: {
        Row: {
          agency_id: string | null
          brand: Json | null
          campaign_manager: Json | null
          campaign_manager_id: string | null
          campaign_name: string | null
          campaign_rate: number | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          confirm_by: string | null
          id: string | null
          influencer: Json | null
          talent_manager: Json | null
          talent_manager_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_profile_view: {
        Row: {
          id: string | null
          location: string | null
          name: string | null
          profile_image: string | null
        }
        Relationships: []
      }
      manager_rejected_campaigns_view: {
        Row: {
          agency_id: string | null
          brand: Json | null
          campaign_manager: Json | null
          campaign_manager_id: string | null
          campaign_name: string | null
          campaign_rate: number | null
          category: Database["public"]["Enums"]["campaign_category"] | null
          date_rejected: string | null
          id: string | null
          influencer: Json | null
          talent_manager: Json | null
          talent_manager_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_campaign_manager_fkey"
            columns: ["campaign_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_talent_manager_fkey"
            columns: ["talent_manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_talent_view: {
        Row: {
          address: string | null
          agency: string | null
          agency_earnings: number | null
          avg_partnership_value: number | null
          city: string | null
          contact: Json | null
          dob: string | null
          gender: string | null
          id: string | null
          influencer_earnings: number | null
          instagram_followers: number | null
          manager: string | null
          niches: string[] | null
          role: Database["public"]["Enums"]["permission_types"] | null
          sexuality: string | null
          socials: Json | null
          state: string | null
          tiktok_followers: number | null
          total_earnings: number | null
          total_reach: number | null
          user: Json | null
          youtube_followers: number | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "user_agency_relation_agency_id_fkey"
            columns: ["agency"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      manager_team_previews: {
        Row: {
          influencers: Json | null
          manager_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_manager_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      my_contacts: {
        Row: {
          agency_id: string | null
          brand: string | null
          email: string | null
          id: number | null
          manager_id: string | null
          name: string | null
          position: string | null
          type: Database["public"]["Enums"]["contact_type"] | null
        }
        Insert: {
          agency_id?: string | null
          brand?: string | null
          email?: string | null
          id?: number | null
          manager_id?: string | null
          name?: string | null
          position?: string | null
          type?: Database["public"]["Enums"]["contact_type"] | null
        }
        Update: {
          agency_id?: string | null
          brand?: string | null
          email?: string | null
          id?: number | null
          manager_id?: string | null
          name?: string | null
          position?: string | null
          type?: Database["public"]["Enums"]["contact_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      pitchlist_contact_info_view: {
        Row: {
          email: string | null
          id: string | null
          name: string | null
          phone: string | null
          website_url: string | null
          whatsapp: string | null
        }
        Relationships: []
      }
      pitchlist_info_view: {
        Row: {
          agency_id: string | null
          created_by: Json | null
          description: string | null
          id: string | null
          influencer_count: number | null
          influencers: Json | null
          name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      pitchlist_users_view: {
        Row: {
          id: string | null
          name: string | null
          users: Json[] | null
        }
        Relationships: []
      }
      pitchlists_view: {
        Row: {
          agency_id: string | null
          created_at: string | null
          created_by: Json | null
          id: string | null
          influencer_count: number | null
          influencer_ids: Json | null
          manager_id: string | null
          name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["manager_id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_basic_info_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitchlist_created_by_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      user_auth_details: {
        Row: {
          agency_id: string | null
          first_name: string | null
          influencer_id: string | null
          last_name: string | null
          manager_id: string | null
          user_id: string | null
          user_permission:
            | Database["public"]["Enums"]["permission_types"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_logo_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency_managers_team_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "influencer_agency_info_view"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "manager_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "manager_agency_info_view"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      user_basic_info_view: {
        Row: {
          birth_date: string | null
          email: string | null
          ethnicity: string[] | null
          gender: string | null
          manager: string | null
          managing: number | null
          phone: string | null
          role: string | null
          sexuality: string | null
          user_id: string | null
        }
        Relationships: []
      }
      user_profile_view: {
        Row: {
          bio: string | null
          location: string | null
          name: string | null
          niches: string[] | null
          profile_image: string | null
          social_following: Json | null
          user_id: string | null
          user_type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      format_team_contact_info: {
        Args: {
          email: string
          phone_number: string
          whatsapp_number: string
        }
        Returns: Json
      }
      get_agency_details: {
        Args: {
          agency_id_param: number
        }
        Returns: {
          id: number
          agency_logo: string
          bio: string
          website_url: string
          phone: string
          email: string
          address: string
          date_founded: string
          location: string
          manager_count: number
          influencer_count: number
        }[]
      }
      get_agency_influencer_count: {
        Args: {
          agency_id_param: string
        }
        Returns: number
      }
      get_agency_info: {
        Args: {
          agency_id_param: string
        }
        Returns: Json
      }
      get_agency_manager_count: {
        Args: {
          agency_id_param: string
        }
        Returns: number
      }
      get_alltime_earnings_influencer: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_avg_partnership_value: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_campaign_edit_info: {
        Args: {
          campaign_id_param: string
        }
        Returns: {
          id: string
          campaign_name: string
          campaign_status: string
          brand_name: string
          brand_link: string
          influencer_id: string
          campaign_manager_id: string
          partnership_type: string
          usage: string
          exclusivity: string
          category: string
          brand_contact_id: number
          campaign_rate: number
          influencer_comission: number
          agency_comission: number
          manager_comission: number
          contract: string
        }[]
      }
      get_campaign_header: {
        Args: {
          campaign_id_param: string
        }
        Returns: {
          brand_contact: Json
          campaign_status: string
          payment_status: string
        }[]
      }
      get_campaign_page_info: {
        Args: {
          campaign_id_param: number
        }
        Returns: {
          id: number
          campaign_name: string
          campaign_status: string
          campaign_rate: number
          category: string
          brand: Json
          influencer: Json
          talent_manager: Json
          campaign_manager: Json
          partnership_type: string
          usage: string
          exclusivity: string
        }[]
      }
      get_campaign_payment_structure: {
        Args: {
          campaign_id_param: string
        }
        Returns: {
          campaign_rate: number
          influencer_commission: number
          agency_commission: number
          manager_commission: number
        }[]
      }
      get_campaign_socials: {
        Args: {
          campaign_id_param: string
        }
        Returns: Json
      }
      get_completed_milestones_count: {
        Args: {
          campaign_id_param: string
        }
        Returns: number
      }
      get_completed_milestones_percentage: {
        Args: {
          campaign_id_param: string
        }
        Returns: number
      }
      get_contact_avg_partnership_value: {
        Args: {
          contact_id_param: number
        }
        Returns: number
      }
      get_contact_last_partnership_date: {
        Args: {
          contact_id_param: number
        }
        Returns: string
      }
      get_contact_niches: {
        Args: {
          contact_id_param: number
        }
        Returns: string[]
      }
      get_contact_num_of_partnerships: {
        Args: {
          contact_id_param: number
        }
        Returns: number
      }
      get_contact_preview: {
        Args: {
          contact_id: number
        }
        Returns: Json
      }
      get_contacts_by_agency: {
        Args: {
          agency_id_param: string
        }
        Returns: {
          id: number
          name: string
          email: string
        }[]
      }
      get_deliverable_milestones: {
        Args: {
          deliverable_id_param: number
        }
        Returns: Json
      }
      get_earnings: {
        Args: {
          rate: number
          percentage: number
        }
        Returns: number
      }
      get_earnings_alltime_agency: {
        Args: {
          a_id: string
        }
        Returns: number
      }
      get_earnings_alltime_influencer: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_earnings_alltime_manager: {
        Args: {
          manager_id: string
        }
        Returns: number
      }
      get_earnings_current_month_influencer: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_earnings_month_agency: {
        Args: {
          agency_id_param: string
          month: number
          year: number
        }
        Returns: number
      }
      get_earnings_month_influencer: {
        Args: {
          influencer_id: string
          month: number
          year: number
        }
        Returns: number
      }
      get_earnings_month_manager: {
        Args: {
          manager_id: string
          month: number
          year: number
        }
        Returns: number
      }
      get_earnings_monthly_agency: {
        Args: {
          agency_id: string
          year: number
        }
        Returns: number[]
      }
      get_earnings_monthly_influencer:
        | {
            Args: {
              influencer_id: string
              month: number
              year: number
            }
            Returns: number
          }
        | {
            Args: {
              influencer_id: string
              year: number
            }
            Returns: number[]
          }
      get_earnings_monthly_manager: {
        Args: {
          manager_id: string
          year: number
        }
        Returns: number[]
      }
      get_earnings_this_month_influencer: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_earnings_yearly_manager: {
        Args: {
          manager_id: string
          year: number
        }
        Returns: number[]
      }
      get_full_name_from_uuid: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_incomplete_milestones_count: {
        Args: {
          campaign_id_param: number
        }
        Returns: number
      }
      get_influencer_info: {
        Args: {
          influencer_id_param: string
        }
        Returns: Json
      }
      get_influencer_manager: {
        Args: {
          influencer_id_param: string
        }
        Returns: {
          manager_id: string
          user_id: string
          name: string
          profile_image: string
        }[]
      }
      get_influencer_preview: {
        Args: {
          influencer_id_param: string
        }
        Returns: Json
      }
      get_influencer_total_followers: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_influencer_total_instagram_followers: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_influencer_total_tiktok_followers: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_influencer_total_youtube_followers: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_influencers_by_agency: {
        Args: {
          agency_id_param: string
        }
        Returns: {
          id: string
          user_id: string
          name: string
          profile_image: string
          user_role: string
        }[]
      }
      get_manager_influencers_count: {
        Args: {
          manager_id_param: string
        }
        Returns: number
      }
      get_manager_ongoing_campaigns_earnings: {
        Args: {
          manager_id: string
        }
        Returns: number
      }
      get_manager_pending_campaigns_earnings: {
        Args: {
          manager_id: string
        }
        Returns: number
      }
      get_manager_profile: {
        Args: {
          manager_id_param: string
        }
        Returns: Json
      }
      get_managers_by_agency: {
        Args: {
          agency_id_param: string
        }
        Returns: {
          id: string
          user_id: string
          name: string
          profile_image: string
          user_role: string
        }[]
      }
      get_milestone_notes: {
        Args: {
          milestone_id_param: number
        }
        Returns: Json
      }
      get_monthly_earnings: {
        Args: {
          influencer_id: string
          year: number
          month: number
        }
        Returns: number
      }
      get_most_recent_incomplete_milestone_due_date: {
        Args: {
          campaign_id_param: string
        }
        Returns: string
      }
      get_most_recent_incomplete_milestone_type: {
        Args: {
          campaign_id_param: string
        }
        Returns: string
      }
      get_pitchlist_influencer_ids: {
        Args: {
          pitchlist_id_param: string
        }
        Returns: Json
      }
      get_pitchlist_influencers: {
        Args: {
          pitchlist_id_param: string
        }
        Returns: Json
      }
      get_social_following: {
        Args: {
          influencer_id_param: string
        }
        Returns: Json
      }
      get_social_handle: {
        Args: {
          social_list: Database["public"]["Enums"]["social_platforms"][]
          iid: string
        }
        Returns: Json[]
      }
      get_social_platforms_list: {
        Args: {
          campaign_id_param: number
        }
        Returns: Database["public"]["Enums"]["social_platforms"][]
      }
      get_this_months_earnings: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_total_campaign_earnings: {
        Args: {
          influencer_id: string
        }
        Returns: number
      }
      get_total_milestones_count: {
        Args: {
          campaign_id_param: number
        }
        Returns: number
      }
      get_unique_social_platforms_list: {
        Args: {
          campaign_id_param: number
        }
        Returns: Database["public"]["Enums"]["social_platforms"][]
      }
      get_urgent_campaigns_count: {
        Args: {
          manager_id: string
        }
        Returns: number
      }
      get_user_info: {
        Args: {
          person_id: string
        }
        Returns: Json
      }
      get_user_preview: {
        Args: {
          manager_or_influencer_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      campaign_category:
        | "Fashion"
        | "Beauty"
        | "Skincare"
        | "Health & Wellness"
        | "Fitness"
        | "Sports"
        | "Tech"
        | "App"
        | "Finance"
        | "Haircare"
        | "Shopping"
        | "Furniture"
        | "Jewelry"
        | "Movies"
        | "Events"
        | "Cleaning"
        | "Home"
        | "Baby"
        | "Travel"
        | "Motherhood"
        | "Entertainment"
        | "Music"
        | "Food"
        | "Beverage"
        | "Cooking"
        | "Kitchen"
        | "Alcohol"
        | "Vegan & Vegetarian"
        | "Transportation"
        | "Other"
        | "Outdoors"
      campaign_status: "pending" | "ongoing" | "completed" | "rejected"
      campaign_usage_type: "organic" | "paid"
      contact_type: "Brand" | "Agency" | "Music"
      influencer_type: "Exclusive" | "Non-exclusive"
      manager_type: "Talent" | "Campaign" | "Owner" | "Finance"
      milestone_status_type: "incomplete" | "pending" | "denied" | "approved"
      milestone_submission_type: "Text" | "Link" | "File"
      notification_type:
        | "acceptcampaign"
        | "rejectcampaign"
        | "pendingcampaign"
        | "milestoneupdate"
        | "milestonesubmission"
        | "milestonedue"
      partnership_type:
        | "UGC"
        | "Brand sponsorship"
        | "Song collab"
        | "Affiliate"
        | "Gifting for content"
        | "Gifting w/o posting obligations"
        | "Events"
        | "Press inquiries"
        | "Features"
        | "Other"
      payment_status:
        | "Pending"
        | "Agency Paid"
        | "Manager Paid"
        | "Influencer Paid"
      payment_type: "Paypal" | "Zelle" | "Direct Deposit" | "Wise"
      permission_types: "Influencer" | "Manager" | "Admin" | "Owner"
      social_platforms:
        | "Tiktok"
        | "Instagram"
        | "Youtube"
        | "X"
        | "Twitch"
        | "Facebook"
        | "Threads"
      task_type: "Contract" | "Script" | "Draft" | "Post" | "Task" | "Other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
